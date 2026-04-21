package com.conecta.service;

public interface IAuthService {
    String[] login(String identifier, String rawPassword);
    String[] refresh(String oldRefreshToken);
}
