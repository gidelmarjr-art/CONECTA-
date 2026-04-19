package com.conecta.service;

import io.lettuce.core.api.StatefulRedisConnection;
import jakarta.inject.Singleton;
import java.time.Duration;
import java.util.UUID;

@Singleton
public class SessionService {

    private final StatefulRedisConnection<String, String> redis;

    private static final String SESSION_PREFIX = "session:";
    private static final String REFRESH_PREFIX = "refresh:";
    private static final long SESSION_TTL_SECONDS = Duration.ofHours(12).getSeconds();
    private static final long REFRESH_TTL_SECONDS = Duration.ofDays(7).getSeconds();

    public SessionService(StatefulRedisConnection<String, String> redis) {
        this.redis = redis;
    }

    public String createSessionToken(String userIdentifier) {
        String token = UUID.randomUUID().toString();
        redis.sync().setex(SESSION_PREFIX + token, SESSION_TTL_SECONDS, userIdentifier);
        return token;
    }

    public String createRefreshToken(String userIdentifier) {
        String token = UUID.randomUUID().toString();
        redis.sync().setex(REFRESH_PREFIX + token, REFRESH_TTL_SECONDS, userIdentifier);
        return token;
    }

    public String validateSessionToken(String token) {
        return redis.sync().get(SESSION_PREFIX + token);
    }

    public String validateRefreshToken(String token) {
        return redis.sync().get(REFRESH_PREFIX + token);
    }

    public void invalidateSession(String token) {
        redis.sync().del(SESSION_PREFIX + token);
    }

    public void invalidateRefreshToken(String token) {
        redis.sync().del(REFRESH_PREFIX + token);
    }
}
