package org.example.backend.service;

import org.example.backend.entity.Cart;
import org.example.backend.entity.CartItem;
import org.example.backend.entity.Item;
import org.example.backend.repository.CartItemRepository;
import org.example.backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;


    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }


    public List<CartItem> getCartItems(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        return cart.getItems();
    }

    public void addItemToCart(Long userId, Item item, int quantity) {
        Cart cart = cartRepository.findByUserId(userId);
        CartItem existing = cart.getItems().stream()
                .filter(ci -> ci.getItem().getId().equals(item.getId()))
                .findFirst()
                .orElse(null);

        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + quantity);
            cartItemRepository.save(existing);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setItem(item);
            cartItem.setQuantity(quantity);
            cart.getItems().add(cartItem);
            cartItemRepository.save(cartItem);
        }
        cartRepository.save(cart);
    }

    public void removeItemFromCart(Long userId, Long cartItemId) {
        Cart cart = cartRepository.findByUserId(userId);
        CartItem toRemove = cart.getItems().stream()
                .filter(ci -> ci.getId().equals(cartItemId)).findFirst().orElse(null);
        if (toRemove != null) {
            cart.getItems().remove(toRemove);
            cartItemRepository.delete(toRemove);
            cartRepository.save(cart);
        }
    }

    public void clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}