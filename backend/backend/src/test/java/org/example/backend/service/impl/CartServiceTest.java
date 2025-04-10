package org.example.backend.service.impl;

import org.example.backend.entity.Book;
import org.example.backend.entity.Coffee;
import org.example.backend.entity.CartItem;
import org.example.backend.service.CartService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class CartServiceTest {

    private CartService cartService;

    @BeforeEach
    public void setUp() {
        cartService = new CartService();
    }

    @Test
    public void addItemToCart_shouldAddBookToCart() {
        Book book = new Book();
        book.setId(1L);
        book.setName("Test Book");
        book.setPrice(19.99);

        cartService.addItemToCart(book, 2);

        List<CartItem> items = cartService.getCartItems();
        assertThat(items).hasSize(1);
        assertThat(items.get(0).getItem()).isEqualTo(book);
        assertThat(items.get(0).getQuantity()).isEqualTo(2);
    }

    @Test
    public void addItemToCart_shouldAddCoffeeToCart() {
        Coffee coffee = new Coffee();
        coffee.setId(1L);
        coffee.setOrigin("Colombia");
        coffee.setSizes(List.of(250, 500)); // Rozmiary w gramach
        coffee.setPrice(List.of(5.99, 9.99)); // Ceny w dolarach

        cartService.addItemToCart(coffee, 3);

        List<CartItem> items = cartService.getCartItems();
        assertThat(items).hasSize(1);
        assertThat(items.get(0).getItem()).isEqualTo(coffee);
        assertThat(items.get(0).getQuantity()).isEqualTo(3);
    }

    @Test
    public void addItemToCart_shouldIncreaseQuantityIfItemAlreadyInCart() {
        Book book = new Book();
        book.setId(1L);
        book.setName("Test Book");
        book.setPrice(19.99);

        cartService.addItemToCart(book, 2);
        cartService.addItemToCart(book, 3);

        List<CartItem> items = cartService.getCartItems();
        assertThat(items).hasSize(1);
        assertThat(items.get(0).getQuantity()).isEqualTo(5);
    }

    @Test
    public void removeItemFromCart_shouldRemoveItemById() {
        Book book = new Book();
        book.setId(1L);
        book.setName("Test Book");
        book.setPrice(19.99);

        cartService.addItemToCart(book, 2);
        cartService.removeItemFromCart(1L);

        assertThat(cartService.getCartItems()).isEmpty();
    }

    @Test
    public void clearCart_shouldRemoveAllItems() {
        Book book = new Book();
        Coffee coffee = new Coffee();
        coffee.setId(1L);
        coffee.setOrigin("Colombia");
        coffee.setSizes(List.of(250, 500)); // Rozmiary w gramach
        coffee.setPrice(List.of(5.99, 9.99)); // Ceny w dolarach

        cartService.addItemToCart(book, 2);
        cartService.addItemToCart(coffee, 3);

        cartService.clearCart();

        assertThat(cartService.getCartItems()).isEmpty();
    }

    @Test
    public void calculateTotalPrice_shouldReturnCorrectTotal() {
        Book book = new Book();
        book.setId(1L);
        book.setName("Test Book");
        book.setPrice(19.99);

        Coffee coffee = new Coffee();
        coffee.setId(1L);
        coffee.setOrigin("Colombia");
        coffee.setSizes(List.of(250, 500)); // Rozmiary w gramach
        coffee.setPrice(List.of(5.99, 9.99));

        cartService.addItemToCart(book, 2);
        cartService.addItemToCart(coffee, 3);

        double total = cartService.calculateTotalPrice();
        assertThat(total).isEqualTo((19.99 * 2) + (5.99 * 3));
    }

}