package com.conecta.util;

import java.security.MessageDigest;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class AesEncryptor {

    private static final String ALGORITHM = "AES/CBC/PKCS5Padding";
    private static final byte[] FIXED_IV = "conecta-iv-16byt".getBytes();

    private static SecretKeySpec buildKey(String secret) throws Exception {
        byte[] hash = MessageDigest.getInstance("SHA-256").digest(secret.getBytes("UTF-8"));
        return new SecretKeySpec(hash, "AES");
    }

    public static String encrypt(String value, String secret) {
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, buildKey(secret), new IvParameterSpec(FIXED_IV));
            return Base64.getEncoder().encodeToString(cipher.doFinal(value.getBytes("UTF-8")));
        } catch (Exception e) {
            throw new RuntimeException("Erro ao criptografar", e);
        }
    }

    public static String decrypt(String encrypted, String secret) {
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, buildKey(secret), new IvParameterSpec(FIXED_IV));
            return new String(cipher.doFinal(Base64.getDecoder().decode(encrypted)), "UTF-8");
        } catch (Exception e) {
            throw new RuntimeException("Erro ao descriptografar", e);
        }
    }

    public static List<String> encrypt(List<String> values, String secret) {
            return values.parallelStream()
                .map(v -> encrypt(v, secret))
                .collect(Collectors.toList());
        }

    public static List<String> decrypt(List<String> values, String secret) {
        return values.parallelStream() 
                 .map(v -> decrypt(v, secret))
                 .collect(Collectors.toList());
    }

    public static void main(String[] args) {

        String chaveSecreta = "senhaSecretaDoConecta123";

        List<String> dadosOriginais = List.of(
            "Pix: 123.456.789-00", 
            "Conta: 1234-5", 
            "Mensagem confidencial do Chat"
        );

        System.out.println("--- 1. DADOS ORIGINAIS ---");
        dadosOriginais.forEach(System.out::println);

        // 3. Testando a Criptografia 
        System.out.println("\n--- 2. DADOS CRIPTOGRAFADOS (Como ficam no banco) ---");
        List<String> dadosCriptografados = encrypt(dadosOriginais, chaveSecreta);
        dadosCriptografados.forEach(System.out::println);

        // 4. Testando a Descriptografia 
        System.out.println("\n--- 3. DADOS DESCRIPTOGRAFADOS (Restaurados) ---");
        List<String> dadosRestaurados = decrypt(dadosCriptografados, chaveSecreta);
        dadosRestaurados.forEach(System.out::println);
    }
}