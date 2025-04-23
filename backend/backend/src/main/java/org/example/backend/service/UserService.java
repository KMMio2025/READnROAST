package org.example.backend.service;

import org.example.backend.dtos.RegisterUserDTO;
import org.example.backend.entity.User;
import org.example.backend.entity.UserDetails;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
}