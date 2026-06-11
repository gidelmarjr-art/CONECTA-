package com.conecta.DTO;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Serdeable
@Getter
@Setter
public class NGO extends User { // HERANÇA

    private String fantazyname;
    private String CNPJ;
    private String fundationname;
    private String responsiblename;
    private String responsablecpf;
    private String email;
    private String passwd;
    private String phone;
    private String publicSpace;
    private String addressNumber;
    private String supplement;
    private String neighborhood;
    private String city;
    private String state;
    private String zipcode;
    private String objectives;
    private LocalDate fundationDate;

    // Sobrescrita
    @Override
    public String getRole() {
        return "ROLE_NGO";
    }

    @Override
    public String toString(){
        return getClass().getSimpleName()+"[ngo="+ getName() +", fname="+fantazyname+", CNPJ="+CNPJ+" fundation="+fundationname+", responsiblename="+responsiblename+", responsablecpf="+responsablecpf+", email="+email+", password="+passwd+"]";
    }
}
