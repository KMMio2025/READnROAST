package org.example.backend.repository;

import org.example.backend.entity.Cart;
import org.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUserId(Long userId);
    Optional<Cart> findByUser(User user);

}