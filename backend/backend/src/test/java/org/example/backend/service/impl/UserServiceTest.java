//package org.example.backend.service.impl;
//
//import org.example.backend.dtos.RegisterUserDTO;
//import org.example.backend.dtos.UserProfileUpdateDTO;
//import org.example.backend.entity.User;
//import org.example.backend.repository.UserRepository;
//import org.example.backend.service.UserService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//class UserServiceTest {
//
//    @Mock
//    private UserRepository userRepository;
//
//    @Mock
//    private PasswordEncoder passwordEncoder;
//
//    @InjectMocks
//    private UserService userService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void shouldRegisterUserSuccessfully() {
//        // Given
//        RegisterUserDTO dto = new RegisterUserDTO();
//        dto.setName("Jan Kowalski");
//        dto.setEmail("jan.kowalski@example.com");
//        dto.setPassword("haslo123");
//        dto.setFirstName("Jan");
//        dto.setLastName("Kowalski");
//        dto.setStreet("Ulica 1");
//        dto.setCity("Miasto");
//        dto.setZip("00-000");
//        dto.setCountry("Polska");
//        dto.setPhone("123456789");
//
//        when(passwordEncoder.encode(dto.getPassword())).thenReturn("encodedPassword");
//
//        // When
//        userService.registerUser(dto);
//
//        // Then
//        verify(userRepository, times(1)).save(any(User.class));
//    }
//
//    @Test
//    void shouldAuthenticateUserSuccessfully() {
//        // Given
//        String email = "jan.kowalski@example.com";
//        String rawPassword = "haslo123";
//        String encodedPassword = "encodedPassword";
//
//        User user = new User();
//        user.setEmail(email);
//        user.setPassword(encodedPassword);
//
//        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
//        when(passwordEncoder.matches(rawPassword, encodedPassword)).thenReturn(true);
//
//        // When
//        User authenticatedUser = userService.authenticate(email, rawPassword);
//
//        // Then
//        assertNotNull(authenticatedUser);
//        assertEquals(email, authenticatedUser.getEmail());
//    }
//
//    @Test
//    void shouldThrowExceptionWhenUserNotFoundDuringAuthentication() {
//        // Given
//        String email = "nonexistent@example.com";
//        String rawPassword = "haslo123";
//
//        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
//
//        // When & Then
//        assertThrows(RuntimeException.class, () -> userService.authenticate(email, rawPassword));
//    }
//
//    @Test
//    void shouldThrowExceptionWhenPasswordDoesNotMatch() {
//        // Given
//        String email = "jan.kowalski@example.com";
//        String rawPassword = "wrongPassword";
//        String encodedPassword = "encodedPassword";
//
//        User user = new User();
//        user.setEmail(email);
//        user.setPassword(encodedPassword);
//
//        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
//        when(passwordEncoder.matches(rawPassword, encodedPassword)).thenReturn(false);
//
//        // When & Then
//        assertThrows(RuntimeException.class, () -> userService.authenticate(email, rawPassword));
//    }
//
//    @Test
//    void shouldUpdateUserName() {
//        // Tworzenie użytkownika bez UserDetails
//        User user = new User();
//        user.setEmail("test@example.com");
//        user.setName("Old Name");
//
//        // Mockowanie repozytorium, aby zwróciło użytkownika
//        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
//
//        // Mockowanie SecurityContext, aby zwróciło bieżącego zalogowanego użytkownika
//        Authentication authentication = mock(Authentication.class);
//        when(authentication.getName()).thenReturn("test@example.com");
//
//        SecurityContext securityContext = mock(SecurityContext.class);
//        when(securityContext.getAuthentication()).thenReturn(authentication);
//
//        SecurityContextHolder.setContext(securityContext);
//
//        // Dane aktualizacji
//        UserProfileUpdateDTO updateDTO = new UserProfileUpdateDTO();
//        updateDTO.setName("Updated Name");
//
//        // Wywołanie metody aktualizującej dane użytkownika
//        userService.updateCurrentUserProfile(updateDTO);
//
//        // Sprawdzanie, czy nazwa użytkownika została zaktualizowana
//        assertEquals("Updated Name", user.getName());
//
//        // Weryfikacja, że metoda save() została wywołana na repozytorium
//        verify(userRepository, times(1)).save(user);
//    }
//}
