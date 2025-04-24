package org.example.backend.dtos;


import lombok.Data;

@Data
public class UserProfileDTO {
    private String name;
    private String email;
    private String firstName;
    private String lastName;
    private String street;
    private String city;
    private String zip;
    private String country;
    private String phone;
}
