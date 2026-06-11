package com.conecta.controller;

import com.conecta.DTO.NGO;
import com.conecta.entities.NGOData;
import jakarta.transaction.Transactional;
import org.mindrot.jbcrypt.BCrypt;

import com.conecta.entities.Databaseconnection;
import com.conecta.repositories.UserRepository;
import com.conecta.service.IAuthService;
import com.conecta.service.SessionService;
import com.conecta.util.AesEncryptor;
import com.conecta.repositories.NGORepository;

import io.micronaut.context.annotation.Value;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.MutableHttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.CookieValue;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import io.micronaut.http.annotation.Status;
import io.micronaut.http.cookie.Cookie;
import io.micronaut.http.cookie.SameSite;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import io.micronaut.serde.annotation.Serdeable;

import java.awt.*;
import java.time.LocalDate;
import java.util.Map;

@Controller("/auth")
@Secured(SecurityRule.IS_ANONYMOUS)
public class UserController {

    @Value("${AES_SECRET}")
    private String secret;

    private final UserRepository repository;
    private final SessionService sessionService;
    private final IAuthService authService;
    private final NGORepository ngoRepository;

    public UserController(UserRepository repo, SessionService sessionService, IAuthService authService, NGORepository ngoRepository) {
        this.repository = repo;
        this.sessionService = sessionService;
        this.authService = authService;
        this.ngoRepository = ngoRepository;
    }

    @Serdeable
    record LoginRequest(String identifier, String password) {}

    @Serdeable
    record RefreshRequest(String refreshToken) {}

    //Sobrecarga
    private MutableHttpResponse<?> buildTokenResponse(String sessionToken, String refreshToken, String role) {
        Cookie sessionCookie = Cookie.of("session_token", sessionToken).path("/").httpOnly(true).secure(true).sameSite(SameSite.Strict).maxAge(43200);
        Cookie refreshCookie = Cookie.of("refresh_token", refreshToken).path("/").httpOnly(true).secure(true).sameSite(SameSite.Strict).maxAge(604800);

        return HttpResponse.ok(Map.of("role", role)).cookie(sessionCookie).cookie(refreshCookie);
    }

    private MutableHttpResponse<?> buildTokenResponse(String sessionToken, String refreshToken) {
        Cookie sessionCookie = Cookie.of("session_token", sessionToken).path("/").httpOnly(true).secure(true).sameSite(SameSite.Strict).maxAge(43200);
        Cookie refreshCookie = Cookie.of("refresh_token", refreshToken).path("/").httpOnly(true).secure(true).sameSite(SameSite.Strict).maxAge(604800);

        return HttpResponse.ok().cookie(sessionCookie).cookie(refreshCookie);
    }

    //rota de login
    @Post("/login")
    @Secured(SecurityRule.IS_ANONYMOUS)
    @ExecuteOn(TaskExecutors.BLOCKING)
    public MutableHttpResponse<?> login(@Body LoginRequest body) {
        try {
            String[] tokens = authService.login(body.identifier(), body.password());
            return buildTokenResponse(tokens[0], tokens[1], tokens[2]);
        } catch (IllegalArgumentException e) {
            return HttpResponse.unauthorized();
        }
    }

    //recarrega o session_token
    @Post("/refresh")
    @ExecuteOn(TaskExecutors.BLOCKING)
    @Secured(SecurityRule.IS_AUTHENTICATED)
    public MutableHttpResponse<?> refresh(@Body RefreshRequest body) {
        try {
            String[] tokens = authService.refresh(body.refreshToken());
            return buildTokenResponse(tokens[0], tokens[1]);
        } catch (IllegalArgumentException e) {
            return HttpResponse.unauthorized();
        }
    }

    //logout
    @Post("/logout")
    @ExecuteOn(TaskExecutors.BLOCKING)
    @Secured(SecurityRule.IS_AUTHENTICATED)
    public MutableHttpResponse<?> logout(
            @CookieValue(value = "session_token", defaultValue = "") String sessionToken,
            @CookieValue(value = "refresh_token", defaultValue = "") String refreshToken) {

        if (!sessionToken.isEmpty()) {
            sessionService.invalidateSession(sessionToken);
        }

        if (!refreshToken.isEmpty()) {
            sessionService.invalidateRefreshToken(refreshToken);
        }

        Cookie expiredSession = Cookie.of("session_token", "").path("/").httpOnly(true).secure(true).sameSite(SameSite.Strict).maxAge(0);

        Cookie expiredRefresh = Cookie.of("refresh_token", "").path("/").httpOnly(true).secure(true).sameSite(SameSite.Strict).maxAge(0);

        return HttpResponse.ok().cookie(expiredSession).cookie(expiredRefresh);
    }

    //rota de registro do usuario
    @Post(value = "/register", consumes = "application/json")
    @Secured(SecurityRule.IS_ANONYMOUS)
    @ExecuteOn(TaskExecutors.BLOCKING)
    @jakarta.transaction.Transactional
    public MutableHttpResponse<?> register(@Body Databaseconnection user) {
        user.setId(null);

        if (user.getPassword() != null) {
            user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        }

        if (user.getName() != null) {
            user.setName(AesEncryptor.encrypt(user.getName(), secret));
        }

        if (user.getEmail() != null) {
            user.setEmail(AesEncryptor.encrypt(user.getEmail(), secret));
        }

        if (user.getSUB() != null) {
            user.setSUB(AesEncryptor.encrypt(user.getSUB(), secret));
        }

        if (user.getFamilyname() != null) {
            user.setFamilyname(AesEncryptor.encrypt(user.getFamilyname(), secret));
        }

        if (user.getCPF() != null) {
            user.setCPF(AesEncryptor.encrypt(user.getCPF(), secret));
        }

        if(user.getRole() != null){
            user.setRole(user.getRole());
        }

        repository.save(user);

        String sessionToken = sessionService.createSessionToken(user.getEmail());
        String refreshToken = sessionService.createRefreshToken(user.getEmail());

        user.setRtoken(refreshToken);
        repository.update(user);

        Cookie sessionCookie = Cookie.of("session_token", sessionToken).path("/").httpOnly(true).secure(true).sameSite(SameSite.Strict).maxAge(43200);

        Cookie refreshCookie = Cookie.of("refresh_token", refreshToken).path("/").httpOnly(true).secure(true).sameSite(SameSite.Strict).maxAge(604800);

        return HttpResponse.created(user).cookie(sessionCookie).cookie(refreshCookie);
    }

    //atualizar dados do usuario
    @Put(value = "/update", consumes = "application/json")
    @ExecuteOn(TaskExecutors.BLOCKING)
    @Secured(SecurityRule.IS_AUTHENTICATED)
    public Databaseconnection update(@Body Databaseconnection user) {

        if (user.getName() != null) {
            user.setName(AesEncryptor.encrypt(user.getName(), secret));
        }

        if (user.getEmail() != null) {
            user.setEmail(AesEncryptor.encrypt(user.getEmail(), secret));
        }

        if (user.getSUB() != null) {
            user.setSUB(AesEncryptor.encrypt(user.getSUB(), secret));
        }

        if (user.getFamilyname() != null) {
            user.setFamilyname(AesEncryptor.encrypt(user.getFamilyname(), secret));
        }

        return repository.update(user);
    }

    //rota que serve pra deletar os dados do banco de dados
    @Delete(value = "/delete", consumes = "application/json")
    @Status(HttpStatus.NO_CONTENT)
    @Secured(SecurityRule.IS_AUTHENTICATED)
    public void delete(@Body Databaseconnection user) {
        repository.delete(user);
    }

    //registro das ONG's
    @Post("/register/ngo")
    @Secured(SecurityRule.IS_ANONYMOUS)
    @ExecuteOn(TaskExecutors.BLOCKING)
    @Transactional
    public MutableHttpResponse<?> register_ngo(@Body NGO request){

        if (ngoRepository.findById(request.getCNPJ()).isPresent()) {
            return HttpResponse.badRequest("CNPJ already registered");
        }

        if (ngoRepository.findByEmail(request.getEmail()).isPresent()) {
            return HttpResponse.badRequest("Email already registered");
        }

        NGOData ngodata = new NGOData();

        ngodata.setCnpj(request.getCNPJ());
        ngodata.setName(request.getName());
        ngodata.setEmail(request.getEmail());
        ngodata.setPassword(BCrypt.hashpw(request.getPasswd(), BCrypt.gensalt()));
        ngodata.setRepresentativeName(request.getResponsiblename());
        ngodata.setPhone(request.getPhone());
        ngodata.setPublicSpace(request.getPublicSpace());
        ngodata.setAddressNumber(request.getAddressNumber());
        ngodata.setSupplement(request.getSupplement());
        ngodata.setNeighborhood(request.getNeighborhood());
        ngodata.setCity(request.getCity());
        ngodata.setState(request.getState());
        ngodata.setZipcode(request.getZipcode());
        ngodata.setObjectives(request.getObjectives());
        ngodata.setFundationDate(request.getFundationDate());

        ngoRepository.save(ngodata);

        String sessionToken = sessionService.createSessionToken(ngodata.getEmail(), "NGO");
        String refreshToken = sessionService.createRefreshToken(ngodata.getEmail());

        Cookie sessionCookie = Cookie.of("session_token", sessionToken).path("/") .httpOnly(true).secure(true).sameSite(SameSite.Strict).maxAge(43200);
        Cookie refreshCookie = Cookie.of("refresh_token", refreshToken).path("/") .httpOnly(true).secure(true).sameSite(SameSite.Strict).maxAge(604800);

        return HttpResponse.created(ngodata).cookie(sessionCookie).cookie(refreshCookie);
    }

    //rota de atualizaçao de dados da ong
    @Put("/update/ngo")
    @ExecuteOn(TaskExecutors.BLOCKING)
    @Secured(SecurityRule.IS_AUTHENTICATED)
    @Transactional
    public MutableHttpResponse<?> updateNgo(@Body NGO request, @CookieValue("session_token") String sessionToken) {
        String sessionData = sessionService.validateSessionToken(sessionToken);

        if (sessionData == null || !sessionData.contains("|")) {
            return HttpResponse.unauthorized();
        }

        //regex
        String email = sessionData.split("\\|")[0];

        NGOData ngo = ngoRepository.findByEmail(email).orElse(null);
        if (ngo == null) {
            return HttpResponse.notFound("NGO not found");
        }

        if (request.getName() != null) {
            ngo.setName(request.getName());
        }

        if (request.getPhone() != null) {
            ngo.setPhone(request.getPhone());
        }

        if (request.getPublicSpace() != null) {
            ngo.setPublicSpace(request.getPublicSpace());
        }

        if (request.getAddressNumber() != null) {
            ngo.setAddressNumber(request.getAddressNumber());
        }

        if (request.getSupplement() != null) {
            ngo.setSupplement(request.getSupplement());
        }

        if (request.getNeighborhood() != null) {
            ngo.setNeighborhood(request.getNeighborhood());
        }

        if (request.getCity() != null) {
            ngo.setCity(request.getCity());
        }

        if (request.getState() != null) {
            ngo.setState(request.getState());
        }

        if (request.getZipcode() != null) {
            ngo.setZipcode(request.getZipcode());
        }

        if (request.getObjectives() != null) {
            ngo.setObjectives(request.getObjectives());
        }

        if (request.getFundationDate() != null) {
            ngo.setFundationDate(request.getFundationDate());
        }

        if (request.getResponsiblename() != null) {
            ngo.setRepresentativeName(request.getResponsiblename());
        }

        ngoRepository.update(ngo);
        return HttpResponse.ok(ngo);
    }

    //rota pra deletar uma ong
    @Delete("/delete/ngo")
    @ExecuteOn(TaskExecutors.BLOCKING)
    @Secured(SecurityRule.IS_AUTHENTICATED)
    @Transactional
    public MutableHttpResponse<?> deleteNgo(@CookieValue("session_token") String sessionToken) {
        String sessionData = sessionService.validateSessionToken(sessionToken);

        if (sessionData == null || !sessionData.contains("|")) {
            return HttpResponse.unauthorized();
        }

        String email = sessionData.split("\\|")[0];

        NGOData ngo = ngoRepository.findByEmail(email).orElse(null);

        if (ngo == null) {
            return HttpResponse.notFound("NGO not found");
        }

        sessionService.invalidateSession(sessionToken);

        ngoRepository.deleteById(ngo.getCnpj());
        return HttpResponse.noContent();
    }
}
