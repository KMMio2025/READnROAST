package org.example.backend.service.impl;

import jakarta.servlet.http.HttpServletResponse;
import org.example.backend.dtos.LoginDTO;
import org.example.backend.dtos.RegisterUserDTO;
import org.example.backend.dtos.UserProfileDTO;
import org.example.backend.entity.AuthResponse;
import org.example.backend.entity.Code;
import org.example.backend.entity.User;
import org.example.backend.entity.UserDetails;
import org.example.backend.repository.UserRepository;
import org.example.backend.service.CookiService;
import org.example.backend.service.JwtService;
import org.example.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private CookiService cookiService;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGenerateToken() {
        String email = "test@example.com";
        String expectedToken = "jwt_token";

        when(jwtService.generateToken(email)).thenReturn(expectedToken);

        String token = userService.generateToken(email);

        assertEquals(expectedToken, token);
        verify(jwtService, times(1)).generateToken(email);
    }

    @Test
    void testValidateToken() {
        String token = "jwt_token";

        doNothing().when(jwtService).validateToken(token);

        userService.validateToken(token);

        verify(jwtService, times(1)).validateToken(token);
    }

    @Test
    void testRegisterUser() {
        RegisterUserDTO registerUserDTO = new RegisterUserDTO();
        registerUserDTO.setName("John Doe");
        registerUserDTO.setEmail("john@example.com");
        registerUserDTO.setPassword("password123");
        registerUserDTO.setFirstName("John");
        registerUserDTO.setLastName("Doe");
        registerUserDTO.setStreet("123 Street");
        registerUserDTO.setCity("City");
        registerUserDTO.setZip("12345");
        registerUserDTO.setCountry("Country");
        registerUserDTO.setPhone("1234567890");

        User savedUser = new User();
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        userService.registerUser(registerUserDTO);

        verify(userRepository, times(1)).save(any(User.class));
        verify(passwordEncoder, times(1)).encode(registerUserDTO.getPassword());
    }

    @Test
    void testFindUserByEmail_UserExists() {
        String email = "test@example.com";
        User user = new User();
        user.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        User result = userService.findUserByEmail(email);

        assertEquals(user, result);
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    void testFindUserByEmail_UserNotFound() {
        String email = "test@example.com";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> userService.findUserByEmail(email));

        assertEquals("Nie znaleziono użytkownika o podanym emailu", exception.getMessage());
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    void testLogin_Success() {
        String email = "test@example.com";
        String password = "password123";
        String encodedPassword = "encoded_password";
        String token = "jwt_token";

        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail(email);
        loginDTO.setPassword(password);

        User user = new User();
        user.setEmail(email);
        user.setPassword(encodedPassword);

        HttpServletResponse response = mock(HttpServletResponse.class);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(password, encodedPassword)).thenReturn(true);
        when(jwtService.generateToken(email)).thenReturn(token);

        ResponseEntity<AuthResponse> result = userService.login(response, loginDTO);

        assertNotNull(result);
        assertEquals(Code.SUCCESS, result.getBody().getCode());
        assertEquals(token, result.getBody().getToken());

        verify(userRepository, times(1)).findByEmail(email);
        verify(passwordEncoder, times(1)).matches(password, encodedPassword);
        verify(jwtService, times(1)).generateToken(email);
        verify(response, times(1)).setHeader("Authorization", "Bearer " + token);
    }

    @Test
    void testLogin_InvalidCredentials() {
        String email = "test@example.com";
        String password = "wrong_password";

        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail(email);
        loginDTO.setPassword(password);

        User user = new User();
        user.setEmail(email);
        user.setPassword("encoded_password");

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(password, user.getPassword())).thenReturn(false);

        Exception exception = assertThrows(RuntimeException.class, () -> userService.login(null, loginDTO));

        assertEquals("Invalid credentials", exception.getMessage());
        verify(userRepository, times(1)).findByEmail(email);
        verify(passwordEncoder, times(1)).matches(password, user.getPassword());
    }

    @Test
    void testGetCurrentUserProfile() {
        String email = "test@example.com";

        User user = new User();
        user.setEmail(email);
        user.setName("John Doe");

        UserDetails userDetails = new UserDetails();
        userDetails.setFirstName("John");
        userDetails.setLastName("Doe");
        userDetails.setStreet("123 Street");
        userDetails.setCity("City");
        userDetails.setZip("12345");
        userDetails.setCountry("Country");
        userDetails.setPhone("1234567890");

        user.setUserDetails(userDetails);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        UserProfileDTO result = userService.getCurrentUserProfile(email);

        assertNotNull(result);
        assertEquals(user.getName(), result.getName());
        assertEquals(user.getEmail(), result.getEmail());
        assertEquals(userDetails.getFirstName(), result.getFirstName());
        assertEquals(userDetails.getLastName(), result.getLastName());

        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    void testGetCurrentUserProfile_UserNotFound() {
        String email = "test@example.com";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> userService.getCurrentUserProfile(email));

        assertEquals("Nie znaleziono użytkownika o podanym emailu", exception.getMessage());
        verify(userRepository, times(1)).findByEmail(email);
    }
}