package com.conecta.controller;

import java.util.List;

import com.conecta.entities.Databaseconnection;
import com.conecta.repositories.UserRepository;
import com.conecta.service.SessionService;
import com.conecta.util.AesEncryptor;
import io.micronaut.http.annotation.Put;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Status;
import org.mindrot.jbcrypt.BCrypt;
import com.conecta.service.AuthService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MutableHttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.CookieValue;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.cookie.Cookie;
import io.micronaut.serde.annotation.Serdeable;
import io.micronaut.http.cookie.SameSite;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;

@Controller("/auth")
@Secured(SecurityRule.IS_ANONYMOUS)
public class UserController {

    private final UserRepository repository;
    private final SessionService sessionService;
    private final AuthService authService;

    public UserController(UserRepository repo, SessionService sessionService, AuthService authService) {
        this.repository = repo;
        this.sessionService = sessionService;
        this.authService = authService;
    }

    @Serdeable
    record LoginRequest(String identifier, String password) {

    }

    @Serdeable
    record RefreshRequest(String refreshToken) {

    }

    @Post("/login")
    public MutableHttpResponse<?> login(@Body LoginRequest body) {
        try {
            String[] tokens = authService.login(body.identifier(), body.password());
            return buildTokenResponse(tokens[0], tokens[1]);
        } catch (IllegalArgumentException e) {
            return HttpResponse.unauthorized();
        }
    }

    @Post("/refresh")
    public MutableHttpResponse<?> refresh(@Body RefreshRequest body) {
        try {
            String[] tokens = authService.refresh(body.refreshToken());
            return buildTokenResponse(tokens[0], tokens[1]);
        } catch (IllegalArgumentException e) {
            return HttpResponse.unauthorized();
        }
    }

    private MutableHttpResponse<?> buildTokenResponse(String sessionToken, String refreshToken) {
        Cookie sessionCookie = Cookie.of("session_token", sessionToken)
                .httpOnly(true)
                .secure(true)
                .sameSite(SameSite.Strict)
                .maxAge(43200);
        Cookie refreshCookie = Cookie.of("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(true)
                .sameSite(SameSite.Strict)
                .maxAge(604800);

        return HttpResponse.ok().cookie(sessionCookie).cookie(refreshCookie);
    }

    @Post("/logout")
    public MutableHttpResponse<?> logout(
            @CookieValue(value = "session_token", defaultValue = "") String sessionToken,
            @CookieValue(value = "refresh_token", defaultValue = "") String refreshToken) {

        if (!sessionToken.isEmpty()) {
            sessionService.invalidateSession(sessionToken);
        }
        if (!refreshToken.isEmpty()) {
            sessionService.invalidateRefreshToken(refreshToken);
        }

        Cookie expiredSession = Cookie.of("session_token", "")
                .httpOnly(true)
                .secure(true)
                .sameSite(SameSite.Strict)
                .maxAge(0);

        Cookie expiredRefresh = Cookie.of("refresh_token", "")
                .httpOnly(true)
                .secure(true)
                .sameSite(SameSite.Strict)
                .maxAge(0);

        return HttpResponse.ok().cookie(expiredSession).cookie(expiredRefresh);
    }

    @Get("/")
    public List<Databaseconnection> getAll() {
        return repository.findAll();
    }

    @Post(value = "/", consumes = "application/json")
    public MutableHttpResponse<?> register(@Body Databaseconnection user) {
        String secret = System.getenv("AES_SECRET");
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
        repository.save(user);

        String sessionToken = sessionService.createSessionToken(user.getEmail());
        String refreshToken = sessionService.createRefreshToken(user.getEmail());

        user.setRtoken(refreshToken);
        repository.update(user);

        Cookie sessionCookie = Cookie.of("session_token", sessionToken)
                .httpOnly(true)
                .secure(true)
                .sameSite(SameSite.Strict)
                .maxAge(43200);

        Cookie refreshCookie = Cookie.of("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(true)
                .sameSite(SameSite.Strict)
                .maxAge(604800);

        return HttpResponse.created(user).cookie(sessionCookie).cookie(refreshCookie);
    }

    @Put(value = "/", consumes = "application/json")
    public Databaseconnection update(@Body Databaseconnection user) {
        String secret = System.getenv("AES_SECRET");
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

    @Delete(value = "/", consumes = "application/json")
    @Status(HttpStatus.NO_CONTENT)
    public void delete(@Body Databaseconnection user) {
        repository.delete(user);
    }
}
