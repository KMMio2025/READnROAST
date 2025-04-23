package org.example.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginDTO {

    @NotBlank(message = "Email nie może być pusty")
    @Email(message = "Niepoprawny format email")
    private String email;

    @NotBlank(message = "Hasło nie może być puste")
    private String password;
}