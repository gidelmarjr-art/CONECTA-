package com.conecta.entities;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Serdeable
@Entity
@Table(name = "User_data")
@Getter
@Setter
@NoArgsConstructor
public class Databaseconnection extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(nullable = true)
    private String name;

    @Column(nullable = true)
    private String familyname;

    @Column(nullable = true)
    private String email;

    @Column(nullable = true)
    private String pictureurl;

    @Column(nullable = true)
    private String locale;

    @Column(nullable = true)
    private String rtoken;

    @Column(name = "SUB", nullable = true)
    private String SUB;

    @Column(name = "CPF", nullable = true)
    private String CPF;

    @Column(nullable = true)
    private String password;

    @Override
    public boolean isValid() {
        return email != null && !email.isBlank()
            && password != null && !password.isBlank();
    }

    @Override
    public String toString() {
        return "Databaseconnection[id=" + id + ", email=" + email
            + ", registrationDate=" + getRegistrationDate() + "]";
    }
}
