package org.example.backend.service;

import org.example.backend.entity.User;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        // Pusta implementacja
        return null;
    }

    public Optional<User> getUserById(int id) {
        // Pusta implementacja
        return Optional.empty();
    }

    public User updateUser(int id, User updatedUser) {
        // Pusta implementacja
        return null;
    }

    public void deleteUser(int id) {
        // Pusta implementacja
    }
}