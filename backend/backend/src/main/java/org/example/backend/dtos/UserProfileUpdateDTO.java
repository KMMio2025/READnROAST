package org.example.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Data
public class UserProfileUpdateDTO {

    @NotBlank(message = "Name cannot be blank")
    private String name;

    @Email(message = "Invalid email format")
    private String email;

    @Size(max = 50, message = "First name cannot exceed 50 characters")
    private String firstName;

    @Size(max = 50, message = "Last name cannot exceed 50 characters")
    private String lastName;

    @Size(max = 100, message = "Street cannot exceed 100 characters")
    private String street;

    @Size(max = 50, message = "City cannot exceed 50 characters")
    private String city;

    @Size(max = 20, message = "ZIP code cannot exceed 20 characters")
    private String zip;

    @Size(max = 50, message = "Country cannot exceed 50 characters")
    private String country;

    @Size(max = 15, message = "Phone number cannot exceed 15 characters")
    private String phone;
}