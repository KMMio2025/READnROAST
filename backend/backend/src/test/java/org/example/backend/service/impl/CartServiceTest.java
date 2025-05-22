package org.example.backend.service.impl;

import org.example.backend.entity.Cart;
import org.example.backend.entity.CartItem;
import org.example.backend.entity.Item;
import org.example.backend.repository.CartItemRepository;
import org.example.backend.repository.CartRepository;
import org.example.backend.service.CartService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class CartServiceTest {

    private CartRepository cartRepository;
    private CartItemRepository cartItemRepository;
    private CartService cartService;

    @BeforeEach
    void setUp() {
        cartRepository = mock(CartRepository.class);
        cartItemRepository = mock(CartItemRepository.class);
        cartService = new CartService(cartRepository, cartItemRepository);
    }

    @Test
    void shouldReturnCartItemsForUser() {
        Cart cart = new Cart();
        List<CartItem> items = new ArrayList<>();
        cart.setItems(items);
        when(cartRepository.findByUserId(1L)).thenReturn(cart);

        List<CartItem> result = cartService.getCartItems(1L);

        assertThat(result).isSameAs(items);
    }

    @Test
    void shouldAddNewItemToCart() {
        Cart cart = new Cart();
        cart.setItems(new ArrayList<>());
        when(cartRepository.findByUserId(1L)).thenReturn(cart);

        Item item = mock(Item.class);
        when(item.getId()).thenReturn(2L);

        cartService.addItemToCart(1L, item, 3);

        ArgumentCaptor<CartItem> captor = ArgumentCaptor.forClass(CartItem.class);
        verify(cartItemRepository).save(captor.capture());
        CartItem saved = captor.getValue();

        assertThat(saved.getItem()).isEqualTo(item);
        assertThat(saved.getQuantity()).isEqualTo(3);
        assertThat(saved.getCart()).isEqualTo(cart);
        assertThat(cart.getItems()).contains(saved);
        verify(cartRepository, times(1)).save(cart);
    }

    @Test
    void shouldIncreaseQuantityIfItemAlreadyExists() {
        // Arrange
        Cart cart = new Cart();
        CartItem cartItem = new CartItem();
        Item item = mock(Item.class);
        when(item.getId()).thenReturn(2L);
        cartItem.setItem(item);
        cartItem.setQuantity(5);
        cart.setItems(new ArrayList<>(List.of(cartItem)));
        when(cartRepository.findByUserId(1L)).thenReturn(cart);

        // Act
        cartService.addItemToCart(1L, item, 2);

        // Assert
        assertThat(cartItem.getQuantity()).isEqualTo(7);
        verify(cartItemRepository).save(cartItem);
    }

    @Test
    void shouldRemoveItemFromCart() {
        Cart cart = new Cart();
        CartItem cartItem = new CartItem();
        cartItem.setId(10L);
        cart.setItems(new ArrayList<>(List.of(cartItem)));
        when(cartRepository.findByUserId(1L)).thenReturn(cart);

        cartService.removeItemFromCart(1L, 10L);

        assertThat(cart.getItems()).doesNotContain(cartItem);
        verify(cartItemRepository).delete(cartItem);
        verify(cartRepository).save(cart);
    }

    @Test
    void shouldClearCart() {
        Cart cart = new Cart();
        CartItem cartItem1 = new CartItem();
        CartItem cartItem2 = new CartItem();
        cart.setItems(new ArrayList<>(List.of(cartItem1, cartItem2)));
        when(cartRepository.findByUserId(1L)).thenReturn(cart);

        cartService.clearCart(1L);

        assertThat(cart.getItems()).isEmpty();
        verify(cartRepository).save(cart);
    }
    
}