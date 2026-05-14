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
            byte[] encryptedbytes = cipher.doFinal(value.getBytes());
            return Base64.getEncoder().encodeToString(encryptedbytes);
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

    public static List<String> encryptList(List<String> values, String secret) {
        return values.parallelStream()
            .map(v -> encrypt(v, secret))
            .collect(Collectors.toList());
    }

    public static List<String> decryptList(List<String> values, String secret) {
        return values.parallelStream()
            .map(v -> decrypt(v, secret))
                .collect(Collectors.toList());
    }
}
