package org.example.backend.Controllers;

import org.example.backend.dtos.RegisterUserDTO;
import org.example.backend.entity.User;
import org.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    private UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterUserDTO registerUserDTO) {
        userService.registerUser(registerUserDTO);
        return ResponseEntity.ok("Użytkownik został zarejestrowany!");
    }


    // Endpoint logowania (Spring Security obsługuje logowanie automatycznie)
    @PostMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.ok("Zalogowano pomyślnie!");
    }

    // Endpoint wylogowania
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Wylogowano pomyślnie!");
    }

    // Endpoint do pobrania danych zalogowanego użytkownika
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findUserByEmail(userDetails.getUsername());
        return ResponseEntity.ok(user);
    }
}