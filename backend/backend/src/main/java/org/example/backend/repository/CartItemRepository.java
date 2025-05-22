package org.example.backend.repository;

import org.example.backend.entity.Cart;
import org.example.backend.entity.CartItem;
import org.example.backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndItem(Cart cart, Item item);
}