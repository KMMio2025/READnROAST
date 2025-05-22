package org.example.backend.service;


import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.example.backend.dtos.LoginDTO;
import org.example.backend.dtos.RegisterUserDTO;
import org.example.backend.dtos.UserProfileDTO;
import org.example.backend.dtos.UserProfileUpdateDTO;
import org.example.backend.entity.*;
import org.example.backend.repository.CartRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final CookiService cookiService;
    private final CartRepository cartRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, CookiService cookiService, CartRepository cartRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.cookiService = cookiService;
        this.cartRepository = cartRepository;
    }
    public String generateToken(String email) {
        return jwtService.generateToken(email);
    }

    public void validateToken(String token) {
        jwtService.validateToken(token);
    }

public void registerUser(RegisterUserDTO registerUserDTO) {
    UserDetails userDetails = new UserDetails();
    userDetails.setFirstName(registerUserDTO.getFirstName());
    userDetails.setLastName(registerUserDTO.getLastName());
    userDetails.setStreet(registerUserDTO.getStreet());
    userDetails.setCity(registerUserDTO.getCity());
    userDetails.setZip(registerUserDTO.getZip());
    userDetails.setCountry(registerUserDTO.getCountry());
    userDetails.setPhone(registerUserDTO.getPhone());

    User user = new User();
    user.setName(registerUserDTO.getName());
    user.setEmail(registerUserDTO.getEmail());
    user.setPassword(passwordEncoder.encode(registerUserDTO.getPassword())); // Kodowanie hasła
    user.setUserDetails(userDetails);

    userDetails.setUser(user);

    Cart cart = new Cart();
    cart.setUser(user);
    cartRepository.save(cart);

    user.setCart(cart);
    userRepository.save(user);

    userRepository.save(user);

    userDetails.setUserId(user.getId());
}

    public User findUserByEmail(String username) {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o podanym emailu"));
    }

    public ResponseEntity<AuthResponse> login(HttpServletResponse response, LoginDTO loginDTO) {
        // Znajdź użytkownika po emailu
        var user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Zweryfikuj hasło
        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Wygeneruj token JWT
        String token = jwtService.generateToken(user.getEmail());

        // Ustaw token w nagłówku odpowiedzi (opcjonalnie)
        response.setHeader("Authorization", "Bearer " + token);

        // Zwróć token w odpowiedzi
        return ResponseEntity.ok(new AuthResponse(Code.SUCCESS, token));
    }


    public UserProfileDTO getCurrentUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o podanym emailu"));

        // Tworzenie obiektu UserProfileDTO
        UserProfileDTO userProfile = new UserProfileDTO();
        userProfile.setName(user.getName());
        userProfile.setEmail(user.getEmail());

        if (user.getUserDetails() != null) {
            userProfile.setFirstName(user.getUserDetails().getFirstName());
            userProfile.setLastName(user.getUserDetails().getLastName());
            userProfile.setStreet(user.getUserDetails().getStreet());
            userProfile.setCity(user.getUserDetails().getCity());
            userProfile.setZip(user.getUserDetails().getZip());
            userProfile.setCountry(user.getUserDetails().getCountry());
            userProfile.setPhone(user.getUserDetails().getPhone());
        }
        return userProfile;
    }

    @Transactional
    public void updateCurrentUserProfile(UserProfileUpdateDTO updateDTO, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));


        if (updateDTO.getName() != null) user.setName(updateDTO.getName());
        if (updateDTO.getEmail() != null) user.setEmail(updateDTO.getEmail());

        UserDetails userDetails = user.getUserDetails();
        if (userDetails != null) {
            if (updateDTO.getFirstName() != null) userDetails.setFirstName(updateDTO.getFirstName());
            if (updateDTO.getLastName() != null) userDetails.setLastName(updateDTO.getLastName());
            if (updateDTO.getStreet() != null) userDetails.setStreet(updateDTO.getStreet());
            if (updateDTO.getCity() != null) userDetails.setCity(updateDTO.getCity());
            if (updateDTO.getZip() != null) userDetails.setZip(updateDTO.getZip());
            if (updateDTO.getCountry() != null) userDetails.setCountry(updateDTO.getCountry());
            if (updateDTO.getPhone() != null) userDetails.setPhone(updateDTO.getPhone());
        }

        userRepository.save(user);
    }


//
//
//    public User authenticate(String email, String rawPassword) {
//        // Znajdź użytkownika po emailu
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o podanym emailu"));
//
//        // Porównaj hasła
//        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
//            throw new RuntimeException("Błędne hasło");
//        }
//
//        return user;
//    }
//

//
//
//    public UserProfileDTO getCurrentUserProfile() {
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("Nie znaleziono zalogowanego użytkownika"));
//
//        UserProfileDTO userProfileDTO = new UserProfileDTO();
//        userProfileDTO.setName(user.getName());
//        userProfileDTO.setEmail(user.getEmail());
//        userProfileDTO.setFirstName(user.getUserDetails().getFirstName());
//        userProfileDTO.setLastName(user.getUserDetails().getLastName());
//        userProfileDTO.setStreet(user.getUserDetails().getStreet());
//        userProfileDTO.setCity(user.getUserDetails().getCity());
//        userProfileDTO.setZip(user.getUserDetails().getZip());
//        userProfileDTO.setCountry(user.getUserDetails().getCountry());
//        userProfileDTO.setPhone(user.getUserDetails().getPhone());
//
//        return userProfileDTO;
//    }
//
//
//    @Transactional
//    public void updateCurrentUserProfile(UserProfileUpdateDTO updateDTO) {
//        // Pobranie zalogowanego użytkownika
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        // Aktualizacja danych użytkownika
//        if (updateDTO.getName() != null) user.setName(updateDTO.getName());
//        if (updateDTO.getEmail() != null) user.setEmail(updateDTO.getEmail());
//
//        // Aktualizacja danych szczegółowych (UserDetails)
//        UserDetails userDetails = user.getUserDetails();
//        if (userDetails != null) {
//            if (updateDTO.getFirstName() != null) userDetails.setFirstName(updateDTO.getFirstName());
//            if (updateDTO.getLastName() != null) userDetails.setLastName(updateDTO.getLastName());
//            if (updateDTO.getStreet() != null) userDetails.setStreet(updateDTO.getStreet());
//            if (updateDTO.getCity() != null) userDetails.setCity(updateDTO.getCity());
//            if (updateDTO.getZip() != null) userDetails.setZip(updateDTO.getZip());
//            if (updateDTO.getCountry() != null) userDetails.setCountry(updateDTO.getCountry());
//            if (updateDTO.getPhone() != null) userDetails.setPhone(updateDTO.getPhone());
//        }
//
//        // Zapis do bazy danych
//        userRepository.save(user);
//    }
}