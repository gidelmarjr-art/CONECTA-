package com.conecta.service;

import io.lettuce.core.api.StatefulRedisConnection;
import jakarta.inject.Singleton;
import java.time.Duration;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Singleton
public class SessionService {

    private final ConcurrentHashMap<String, String> sessionStore = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, String> refreshStore = new ConcurrentHashMap<>();

    private static final String SESSION_PREFIX = "session:";
    private static final String REFRESH_PREFIX = "refresh:";
    private static final long SESSION_TTL_SECONDS = Duration.ofHours(12).getSeconds();
    private static final long REFRESH_TTL_SECONDS = Duration.ofDays(7).getSeconds();

    public SessionService(StatefulRedisConnection<String, String> redis) {

    }

    public String createSessionToken(String userIdentifier) {
        return createSessionToken(userIdentifier, "VOLUNTEER");
    }

    public String createSessionToken(String userIdentifier, String role) {
        String token = UUID.randomUUID().toString();
        String data = userIdentifier + "|" + role;
        sessionStore.put(SESSION_PREFIX + token, data);
        return token;
    }

    public String createRefreshToken(String userIdentifier) {
        String token = UUID.randomUUID().toString();
        refreshStore.put(SESSION_PREFIX + token, userIdentifier);
        return token;
    }

    public String validateSessionToken(String token) {
        return sessionStore.get(SESSION_PREFIX + token);
    }

    public String validateRefreshToken(String token) {
        return refreshStore.get(REFRESH_PREFIX + token);
    }

    public void invalidateSession(String token) {
        sessionStore.remove(SESSION_PREFIX + token);
    }

    public void invalidateRefreshToken(String token) {
        refreshStore.remove(REFRESH_PREFIX + token);
    }
}
