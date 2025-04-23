package org.example.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterUserDTO {

    @NotBlank(message = "Imię nie może być puste")
    private String name;

    @NotBlank(message = "Email nie może być pusty")
    @Email(message = "Niepoprawny format email")
    private String email;

    @NotBlank(message = "Hasło nie może być puste")
    @Size(min = 8, message = "Hasło musi mieć przynajmniej 8 znaków")
    private String password;

    @NotBlank(message = "Imię w szczegółach nie może być puste")
    private String firstName;

    @NotBlank(message = "Nazwisko w szczegółach nie może być puste")
    private String lastName;

    private String street;

    private String city;

    private String zip;

    private String country;

    private String phone;
}