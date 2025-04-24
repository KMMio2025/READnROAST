package org.example.backend.service;

import org.example.backend.dtos.RegisterUserDTO;
import org.example.backend.dtos.UserProfileDTO;
import org.example.backend.entity.User;
import org.example.backend.entity.UserDetails;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerUser(org.example.backend.dtos.RegisterUserDTO dto) {
        // Tworzymy obiekt UserDetails
        UserDetails userDetails = new UserDetails();
        userDetails.setFirstName(dto.getFirstName());
        userDetails.setLastName(dto.getLastName());
        userDetails.setStreet(dto.getStreet());
        userDetails.setCity(dto.getCity());
        userDetails.setZip(dto.getZip());
        userDetails.setCountry(dto.getCountry());
        userDetails.setPhone(dto.getPhone());

        // Tworzymy obiekt User
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword())); // Kodowanie hasła
        user.setUserDetails(userDetails);

        // Ustawiamy relację dwukierunkową
        userDetails.setUser(user);

        // Zapisujemy użytkownika w bazie
        userRepository.save(user);
    }


    public User authenticate(String email, String rawPassword) {
        // Znajdź użytkownika po emailu
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o podanym emailu"));

        // Porównaj hasła
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Błędne hasło");
        }

        return user;
    }

    public User findUserByEmail(String username) {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o podanym emailu"));
    }


    public UserProfileDTO getCurrentUserProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono zalogowanego użytkownika"));

        UserProfileDTO userProfileDTO = new UserProfileDTO();
        userProfileDTO.setName(user.getName());
        userProfileDTO.setEmail(user.getEmail());
        userProfileDTO.setFirstName(user.getUserDetails().getFirstName());
        userProfileDTO.setLastName(user.getUserDetails().getLastName());
        userProfileDTO.setStreet(user.getUserDetails().getStreet());
        userProfileDTO.setCity(user.getUserDetails().getCity());
        userProfileDTO.setZip(user.getUserDetails().getZip());
        userProfileDTO.setCountry(user.getUserDetails().getCountry());
        userProfileDTO.setPhone(user.getUserDetails().getPhone());

        return userProfileDTO;
    }
}