package org.example.backend.Controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.example.backend.dtos.LoginDTO;
import org.example.backend.dtos.RegisterUserDTO;
import org.example.backend.dtos.UserProfileDTO;
import org.example.backend.dtos.UserProfileUpdateDTO;
import org.example.backend.entity.AuthResponse;
import org.example.backend.entity.Code;
import org.example.backend.service.JwtService;
import org.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    @RequestMapping(path = "/register", method = RequestMethod.POST)
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterUserDTO registerUserDTO) {
        userService.registerUser(registerUserDTO);
        return ResponseEntity.ok(new AuthResponse(Code.SUCCESS));
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public ResponseEntity<AuthResponse> login(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {
        return userService.login(response, loginDTO);
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body(new AuthResponse(Code.ERROR));
        }

        String token = authorizationHeader.substring(7); // Usuń "Bearer "
        jwtService.invalidateToken(token); // Dodaj token do czarnej listy
        return ResponseEntity.ok(new AuthResponse(Code.SUCCESS));
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileDTO> getCurrentUserProfile() {
        // Pobierz email aktualnie zalogowanego użytkownika
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserProfileDTO userProfile = userService.getCurrentUserProfile(email);
        return ResponseEntity.ok(userProfile);
    }

    @PutMapping("/me")
    public ResponseEntity<AuthResponse> updateProfile(@RequestBody UserProfileUpdateDTO updateDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        userService.updateCurrentUserProfile(updateDTO, email);
        return ResponseEntity.ok(new AuthResponse(Code.SUCCESS));
    }

}