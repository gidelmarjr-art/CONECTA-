package com.conecta.entities;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Serdeable
@Entity
@Table(name = "volunteer_data")
@Getter
@Setter
@NoArgsConstructor
public class Vacancy {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String supplement;
    @Enumerated(EnumType.STRING)
    private TypeEnum type;
    @Enumerated(EnumType.STRING)
    private TimeEnum time;
    private String requirements;
    @Column(name = "service_type")
    @Enumerated(EnumType.STRING)
    private ServiceTypeEnum serviceType;
    @Column(name = "registration_date", insertable = false, updatable = false)
    private LocalDateTime registrationDate;
    private String ongname;
    @Column(name = "ong_cnpj")
    private String ongCnpj;

    public enum TypeEnum {
        In_person,
        Remote,
        Hybrid
    }
    public enum TimeEnum {
        Morning,
        Afternoon,
        Evening,
        Weekend
    }
    public enum ServiceTypeEnum {
        Beginner,
        Intermediate,
        Specialist
    }
}