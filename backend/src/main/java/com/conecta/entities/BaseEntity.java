package com.conecta.entities;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;

@MappedSuperclass
@Getter
@Setter
public abstract class BaseEntity {

    @Column(name = "registration_date", insertable = false, updatable = false)
    private Timestamp registrationDate;

    @PrePersist
    protected void onCreate() {
        this.registrationDate = new Timestamp(System.currentTimeMillis());
    }

    public abstract boolean isValid();

    @Override
    public String toString() {
        return getClass().getSimpleName() + "[registrationDate=" + registrationDate + "]";
    }
}
