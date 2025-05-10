package org.example.backend.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.backend.dtos.LoginDTO;
import org.example.backend.dtos.RegisterUserDTO;
import org.example.backend.entity.AuthResponse;
import org.example.backend.entity.Code;
import org.example.backend.entity.User;
import org.example.backend.entity.UserDetails;
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

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, CookiService cookiService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.cookiService = cookiService;
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

        userRepository.save(user);
    }

    public User findUserByEmail(String username) {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o podanym emailu"));
    }

    public ResponseEntity<AuthResponse> login(HttpServletResponse response, LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o podanym emailu"));

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Błędne hasło");
        }

        String token = jwtService.generateToken(user.getEmail());

        Cookie jwtCookie = cookiService.generateCookie("jwt", token, 60 * 60 * 24); // 1 dzień

        response.addCookie(jwtCookie);

        return ResponseEntity.ok(new AuthResponse(Code.SUCCESS));
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