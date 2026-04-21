package com.conecta.controller;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public abstract class User {
    public String name;
    public String CPF;
    public abstract String getRole();

    @Override
    public String toString() {
        return getClass().getSimpleName() + "[name=" + name + ", CPF=" + CPF + "]";
    }
}
