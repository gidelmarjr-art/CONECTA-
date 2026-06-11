package com.conecta.DTO;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public abstract class User {
    // 1. ENCAPSULAMENTO
    private String name;
    private String CPF;

    // 2. ABSTRAÇÃO
    public abstract String getRole();

    // Getters e Setters públicos
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCPF() {
        return CPF;
    }

    public void setCPF(String CPF) {
        if (CPF != null && (CPF.length() == 11 || CPF.length() == 14)) { 
            this.CPF = CPF;
        } else {
            throw new IllegalArgumentException("Documento inválido para o sistema Conecta+");
        }
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "[name=" + name + ", CPF=" + CPF + "]";
    }
}
