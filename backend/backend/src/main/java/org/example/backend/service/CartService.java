package org.example.backend.service;

import org.example.backend.entity.Cart;
import org.example.backend.entity.CartItem;
import org.example.backend.entity.Item;
import org.example.backend.entity.User;
import org.example.backend.repository.CartItemRepository;
import org.example.backend.repository.CartRepository;
import org.example.backend.repository.ItemRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private ItemRepository itemRepository;


    @Autowired
    private UserRepository userRepository;

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

    public void addItemToCart(Long itemId, int quantity) {
        // Pobierz zalogowanego użytkownika z kontekstu Spring Security
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName(); // zakładając, że username to email

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Znajdź lub utwórz koszyk
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        // Znajdź item (Coffee lub Book)
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        // Sprawdź, czy już jest taki item w koszyku
        Optional<CartItem> existingCartItem = cartItemRepository.findByCartAndItem(cart, item);
        if (existingCartItem.isPresent()) {
            CartItem cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItemRepository.save(cartItem);
        } else {
            CartItem newCartItem = new CartItem();
            newCartItem.setCart(cart);
            newCartItem.setItem(item);
            newCartItem.setQuantity(quantity);
            cartItemRepository.save(newCartItem);
        }
    }

    public void removeItemFromCart(Long itemId) {
        // Pobierz zalogowanego użytkownika
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        CartItem cartItem = cartItemRepository.findByCartAndItem(cart, item)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));

        cartItemRepository.delete(cartItem);
    }

}