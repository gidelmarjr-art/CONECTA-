package com.conecta.DTO;

public abstract class AuthRequest {
    protected String email;
    protected String password;

    // Método abstrato que define que qualquer tipo de login precisa ser validado
    public abstract boolean dadosValidos();
}