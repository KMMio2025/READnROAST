package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.CartDTO;
import org.example.backend.entity.Cart;
import org.example.backend.entity.CartItem;
import org.example.backend.entity.Item;
import org.example.backend.entity.User;
import org.example.backend.repository.CartItemRepository;
import org.example.backend.repository.CartRepository;
import org.example.backend.repository.ItemRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartService {
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Transactional(readOnly = true)
    public CartDTO getCartForUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o podanym emailu"));
        Cart cart = user.getCart();
        return CartDTO.fromEntity(cart);
    }

    @Transactional
    public void addItem(String email, Long itemId, int quantity) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o podanym emailu"));
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono itemu"));
        Cart cart = user.getCart();

        CartItem cartItem = cartItemRepository.findByCartAndItem(cart, item).orElse(null);
        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setItem(item);
            cartItem.setQuantity(quantity);
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }
        cartItemRepository.save(cartItem);
    }

    @Transactional
    public void updateItem(String email, Long itemId, int quantity) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        Cart cart = user.getCart();

        CartItem cartItem = cartItemRepository.findByCartAndItem(cart, item)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);
    }

    @Transactional
    public void removeItem(String email, Long itemId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o podanym emailu"));
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono itemu"));
        Cart cart = user.getCart();

        CartItem cartItem = cartItemRepository.findByCartAndItem(cart, item).orElse(null);
        if (cartItem != null) {
            cartItemRepository.delete(cartItem);
        }
    }

    @Transactional
    public void clearCart(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o podanym emailu"));
        Cart cart = user.getCart();
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}