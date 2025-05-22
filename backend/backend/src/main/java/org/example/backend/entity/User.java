package org.example.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.example.backend.enums.Role;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Imię nie może być puste")
    private String name;

    @NotBlank(message = "Email nie może być pusty")
    @Email(message = "Niepoprawny format email")
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Hasło nie może być puste")
    @Size(min = 8, message = "Hasło musi mieć przynajmniej 8 znaków")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER; // Domyślna rola

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "details_id", referencedColumnName = "id")
    private UserDetails userDetails;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Cart cart;
}