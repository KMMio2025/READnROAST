package org.example.backend.entity;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class AuthResponse {

    private final String timestamp;
    private final String message;
    private final Code code;

    // Konstruktor z jednym argumentem
    public AuthResponse(Code code) {
        this.timestamp = String.valueOf(new Timestamp(System.currentTimeMillis()));
        this.message = code.label;
        this.code = code;
    }

    // Konstruktor z trzema argumentami
    public AuthResponse(String timestamp, String message, Code code) {
        this.timestamp = timestamp;
        this.message = message;
        this.code = code;
    }

    // Konstruktor z trzema argumentami
    public AuthResponse(Code code, String message) {
        this.message = message;
        this.code = code;
        this.timestamp = String.valueOf(new Timestamp(System.currentTimeMillis()));
    }

    public String getToken() {
        return message;
    }
}