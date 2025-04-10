package org.example.backend.service;

import org.example.backend.entity.CartItem;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    private final List<CartItem> cartItems = new ArrayList<>();

    public List<CartItem> getCartItems() {
        return null;
    }

    public void addItemToCart(Object item, int quantity) {
    }

    public void removeItemFromCart(Long id) {
    }

    public void clearCart() {
    }

    public double calculateTotalPrice() {
        return 0;
    }
}