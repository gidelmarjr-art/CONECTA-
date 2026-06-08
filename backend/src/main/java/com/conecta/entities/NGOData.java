package com.conecta.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "ONG_DATA")
@Getter
@Setter
@NoArgsConstructor
public class NGOData {

    @Id
    @Column(length = 14)
    private String cnpj;
    private String name;
    private String phone;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(name = "public_space")
    private String publicSpace;
    @Column(name = "addess_number")
    private String addressNumber;
    private String supplement;
    private String neighborhood;
    private String city;
    private String state;
    private String zipcode;
    @Column(name = "representative_name")
    private String representativeName;
    private String objectives;
    @Column(name = "fundation_date")
    private LocalDate fundationDate;
    @Column(name = "cadastration_date", insertable = false, updatable = false)
    private LocalDateTime cadastrationDate;
    @Column(nullable = false)
    private String password;
}
