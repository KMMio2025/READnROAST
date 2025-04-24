package org.example.backend.service.impl;

import org.example.backend.Controllers.AuthController;
import org.example.backend.dtos.UserProfileDTO;
import org.example.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @Mock
    private UserService userService; // Mock serwisu UserService

    @Mock
    private SecurityContext securityContext; // Mock SecurityContext

    @Mock
    private Authentication authentication; // Mock Authentication

    @InjectMocks
    private AuthController authController; // InjectMocks wstrzykuje mocki do AuthController

    @BeforeEach
    void setUp() {
        // Inicjalizacja mocków
        MockitoAnnotations.openMocks(this);

        // Ustawienie SecurityContextHolder
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void shouldReturnUserProfileWhenUserIsAuthenticated() {
        // Mockowanie SecurityContextHolder dla zalogowanego użytkownika
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getPrincipal()).thenReturn("test@example.com");

        // Mockowanie UserService
        UserProfileDTO mockUserProfile = new UserProfileDTO();
        mockUserProfile.setName("Test User");
        mockUserProfile.setEmail("test@example.com");
        when(userService.getCurrentUserProfile()).thenReturn(mockUserProfile);

        // Wywołanie metody
        ResponseEntity<?> response = authController.getCurrentUser();

        // Weryfikacja
        assertEquals(HttpStatus.OK, response.getStatusCode(), "Expected status 200 OK");
        assertEquals(mockUserProfile, response.getBody(), "Expected UserProfileDTO in response body");
        verify(userService, times(1)).getCurrentUserProfile(); // Sprawdzenie, czy serwis został wywołany
    }

    @Test
    void shouldReturnUnauthorizedWhenUserIsNotAuthenticated() {
        // Mockowanie SecurityContextHolder dla niezalogowanego użytkownika
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(false);
        SecurityContextHolder.setContext(securityContext);

        // Wywołanie metody
        ResponseEntity<?> response = authController.getCurrentUser();

        // Weryfikacja
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals(Map.of("error", "User not logged in"), response.getBody());
        verify(userService, never()).getCurrentUserProfile();
    }

    @Test
    void shouldReturnUnauthorizedWhenAuthenticationIsNull() {
        // Mockowanie SecurityContextHolder bez uwierzytelnienia
        when(securityContext.getAuthentication()).thenReturn(null);
        SecurityContextHolder.setContext(securityContext);

        // Wywołanie metody
        ResponseEntity<?> response = authController.getCurrentUser();

        // Weryfikacja
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals(Map.of("error", "User not logged in"), response.getBody());
        verify(userService, never()).getCurrentUserProfile();
    }
}