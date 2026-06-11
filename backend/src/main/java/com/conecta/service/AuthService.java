package com.conecta.service;

import com.conecta.entities.Databaseconnection;
import com.conecta.entities.NGOData;
import com.conecta.repositories.NGORepository;
import com.conecta.repositories.UserRepository;
import com.conecta.util.AesEncryptor;
import io.micronaut.context.annotation.Value;
import jakarta.inject.Singleton;
import org.mindrot.jbcrypt.BCrypt;
import java.util.Optional;

@Singleton
// Polimorfismo
public class AuthService implements IAuthService {

    @Value("${AES_SECRET}")
    private String secret;

    private final UserRepository userRepository;
    private final SessionService sessionService;
    private final NGORepository ngoRepository;

    public AuthService(UserRepository userRepository, SessionService sessionService, NGORepository ngoRepository) {
        this.userRepository = userRepository;
        this.sessionService = sessionService;
        this.ngoRepository = ngoRepository;
    }

    public String[] login(String identifier, String rawPassword) {

        Optional<NGOData> ngoOpt = ngoRepository.findByEmail(identifier);

        if (ngoOpt.isPresent()) {
            NGOData ngo = ngoOpt.get();

            if (BCrypt.checkpw(rawPassword, ngo.getPassword())) {
                String session = sessionService.createSessionToken(ngo.getEmail(), "NGO");
                String refresh = sessionService.createRefreshToken(ngo.getEmail());

                return new String[]{session, refresh, "NGO"};
            }

        }

        String encryptedIdentifier = AesEncryptor.encrypt(identifier, secret);
        Optional<Databaseconnection> userOpt = userRepository.findByEmail(encryptedIdentifier);

        if (userOpt.isPresent()) {
            Databaseconnection user = userOpt.get();

            if (BCrypt.checkpw(rawPassword, user.getPassword())) {
                String role = user.getRole() != null ? user.getRole() : "VOLUNTEER";
                String session = sessionService.createSessionToken(user.getEmail(), role);
                String refresh = sessionService.createRefreshToken(user.getEmail());
                return new String[]{session, refresh, role};
            }

        }

        throw new IllegalArgumentException("invalid credentials");
    }

    @Override
    public String[] refresh(String oldRefreshToken) {
        String userIdentifier = sessionService.validateRefreshToken(oldRefreshToken);

        if (userIdentifier == null) {
            throw new IllegalArgumentException(" refresh token");
        }

        String role = findRoleByIdentifier(userIdentifier);

        sessionService.invalidateRefreshToken(oldRefreshToken);

        String newSession = sessionService.createSessionToken(userIdentifier, role);
        String newRefresh = sessionService.createRefreshToken(userIdentifier);

        if ("NGO".equals(role)) {
            return new String[]{newSession, newRefresh};
        }

        userRepository.findByEmail(userIdentifier).ifPresent(user -> {
            user.setRtoken(newRefresh);
            userRepository.update(user);
        });

        return new String[]{newSession, newRefresh};
    }

    private String findRoleByIdentifier(String identifier) {
        Optional<Databaseconnection> userOpt = userRepository.findByEmail(identifier);

        if (userOpt.isPresent()) {
            return userOpt.get().getRole();
        }

        Optional<NGOData> ngoOpt = ngoRepository.findByEmail(identifier);

        if (ngoOpt.isPresent()) {
            return "NGO";
        }

        return "UNKNOWN";
    }
}
