package org.example.backend.repository;

import org.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // Możesz dodać dodatkowe metody, np. wyszukiwanie po nazwie użytkownika lub emailu
    Optional<User> findByEmail(String email);
}