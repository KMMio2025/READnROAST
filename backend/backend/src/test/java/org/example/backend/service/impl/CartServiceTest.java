package org.example.backend.service.impl;

import org.example.backend.entity.Cart;
import org.example.backend.entity.CartItem;
import org.example.backend.entity.Item;
import org.example.backend.entity.User;
import org.example.backend.repository.CartItemRepository;
import org.example.backend.repository.CartRepository;
import org.example.backend.repository.ItemRepository;
import org.example.backend.repository.UserRepository;
import org.example.backend.service.CartService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class CartServiceTest {

    private UserRepository userRepository;
    private ItemRepository itemRepository;
    private CartRepository cartRepository;
    private CartItemRepository cartItemRepository;
    private CartService cartService;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        itemRepository = mock(ItemRepository.class);
        cartRepository = mock(CartRepository.class);
        cartItemRepository = mock(CartItemRepository.class);
        cartService = new CartService(userRepository, itemRepository, cartRepository, cartItemRepository);
    }

    @Test
    void addItem_shouldAddCartItem_whenUserAndItemExistAndCartIsEmpty() {
        // Arrange
        String email = "test@example.com";
        long itemId = 1L;
        int quantity = 2;

        User user = new User();
        user.setEmail(email);
        Cart cart = new Cart();
        user.setCart(cart);

        Item item = mock(Item.class);
        when(item.getId()).thenReturn(itemId);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(itemRepository.findById(itemId)).thenReturn(Optional.of(item));
        when(cartItemRepository.findByCartAndItem(cart, item)).thenReturn(Optional.empty());

        // Act
        cartService.addItem(email, itemId, quantity);

        // Assert
        ArgumentCaptor<CartItem> captor = ArgumentCaptor.forClass(CartItem.class);
        verify(cartItemRepository).save(captor.capture());
        CartItem saved = captor.getValue();

        assertThat(saved.getCart()).isEqualTo(cart);
        assertThat(saved.getItem()).isEqualTo(item);
        assertThat(saved.getQuantity()).isEqualTo(quantity);
    }
}