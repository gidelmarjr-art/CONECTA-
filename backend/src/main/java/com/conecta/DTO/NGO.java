package com.conecta.DTO;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Serdeable
@Getter
@Setter
public class NGO extends User { // 3. HERANÇA: NGO agora herda tudo de User

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

    // 4. POLIMORFISMO (Sobrescrita): Implementando o método abstrato do pai
    @Override
    public String getRole() {
        return "ROLE_NGO"; // Define dinamicamente o papel da ONG
    }

    @Override
    public String toString(){
        // mudanças para usar o getName() herdado do pai encapsulado
        return getClass().getSimpleName()+"[ngo="+ getName() +", fname="+fantazyname+", CNPJ="+CNPJ+" fundation="+fundationname+", responsiblename="+responsiblename+", responsablecpf="+responsablecpf+", email="+email+", password="+passwd+"]";
    }
}