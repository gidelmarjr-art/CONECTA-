package com.conecta.service;

import com.conecta.entities.Databaseconnection;
import com.conecta.repositories.UserRepository;
import com.conecta.util.AesEncryptor;
import jakarta.inject.Singleton;
import org.mindrot.jbcrypt.BCrypt;
import java.util.Optional;

@Singleton
public class AuthService implements IAuthService {

    private final UserRepository userRepository;
    private final SessionService sessionService;

    public AuthService(UserRepository userRepository, SessionService sessionService) {
        this.userRepository = userRepository;
        this.sessionService = sessionService;
    }

    public String[] login(String identifier, String rawPassword) {
        String secret = System.getenv("AES_SECRET");
        String encryptedIdentifier = AesEncryptor.encrypt(identifier, secret);

        Optional<Databaseconnection> userOpt = userRepository.findByEmail(encryptedIdentifier);
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByCPF(encryptedIdentifier);
        }

        Databaseconnection user = userOpt.orElseThrow(() ->
            new IllegalArgumentException("Credenciais inválidas"));

        if (!BCrypt.checkpw(rawPassword, user.getPassword())) {
            throw new IllegalArgumentException("Credenciais inválidas");
        }

        String sessionToken = sessionService.createSessionToken(user.getEmail());
        String refreshToken = sessionService.createRefreshToken(user.getEmail());

        user.setRtoken(refreshToken);
        userRepository.update(user);

        return new String[]{sessionToken, refreshToken};
    }

    public String[] refresh(String oldRefreshToken) {
        String userIdentifier = sessionService.validateRefreshToken(oldRefreshToken);
        if (userIdentifier == null) {
            throw new IllegalArgumentException("Refresh token inválido ou expirado");
        }

        sessionService.invalidateRefreshToken(oldRefreshToken);
        String newSession = sessionService.createSessionToken(userIdentifier);
        String newRefresh = sessionService.createRefreshToken(userIdentifier);

        userRepository.findByEmail(userIdentifier).ifPresent(user -> {
            user.setRtoken(newRefresh);
            userRepository.update(user);
        });

        return new String[]{newSession, newRefresh};
    }
}
