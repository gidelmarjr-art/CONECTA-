package com.conecta.util;

import com.conecta.DTO.NGO;
import com.conecta.DTO.User;

public class TesteConceitos {
    public static void main(String[] args) {
        System.out.println("=== INICIANDO TESTE DOS CONCEITOS DE OO ===");

        try {
            // 1. TESTANDO HERANÇA E POLIMORFISMO
            // Criamos uma referência do tipo generico (User), mas instanciamos uma ONG!
            User minhaOng = new NGO();
            
            // Usando os Setters herdados da classe abstrata User (Encapsulamento)
            minhaOng.setName("ONG Corrente do Bem");
            
            // 2. TESTANDO POLIMORFISMO NA PRÁTICA
            // O método getRole() vai executar o comportamento específico da classe NGO
            System.out.println("Nome da ONG: " + minhaOng.getName());
            System.out.println("Papel no sistema (Polimorfismo): " + minhaOng.getRole());
            System.out.println("Dados do toString: " + minhaOng.toString());

            System.out.println("\n-----------------------------------\n");

            // 3. TESTANDO VALIDAÇÃO DO ENCAPSULAMENTO (Cenário de Erro)
            System.out.println("Tentando inserir um CPF inválido de 3 dígitos...");
            minhaOng.setCPF("123"); // Isso deve estourar a nossa regra do Setter!

        } catch (IllegalArgumentException e) {
            // 4. TRY-CATCH (Que você já tem no projeto, capturando o erro controlado)
            System.out.println("Sucesso no teste de segurança! Capturado pelo Try-Catch: " + e.getMessage());
        }
        
        System.out.println("\n=== FIM DO TESTE ===");
    }
}