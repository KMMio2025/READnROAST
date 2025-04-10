package org.example.backend.service.impl;

import org.example.backend.entity.Book;
import org.example.backend.entity.Coffee;
import org.example.backend.entity.Order;
import org.example.backend.entity.OrderItem;
import org.example.backend.service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class OrderServiceTest {

    private OrderService orderService;

    @BeforeEach
    public void setUp() {
        orderService = new OrderService();
    }

    @Test
    public void getOrderById_shouldReturnOrder_whenValidIdProvided() {
        Long orderId = 1L;

        Order order = orderService.getOrderById(orderId);

        // Zakładamy, że metoda powinna zwrócić zamówienie
        assertThat(order).isNotNull();
        assertThat(order.getId()).isEqualTo(orderId);
    }

    @Test
    public void getAllOrders_shouldReturnListOfOrders_whenOrdersExist() {
        List<Order> orders = orderService.getAllOrders();

        // Zakładamy, że metoda powinna zwrócić listę zamówień
        assertThat(orders).isNotNull();
        assertThat(orders).isEmpty();
    }

    @Test
    public void createOrder_shouldReturnOrder_whenValidDataProvided() {
        List<OrderItem> orderItems = new ArrayList<>();

        Book book = new Book();
        book.setName("Test Book");
        book.setDescription("A sample book description.");
        book.setQuantity(2);
        book.setAuthor("Author Name");
        book.setPrice(29.99);

        Coffee coffee = new Coffee();
        coffee.setName("Colombian Coffee");
        coffee.setDescription("A rich and aromatic coffee.");
        coffee.setQuantity(1);
        coffee.setOrigin("Colombia");
        coffee.setPrice(Collections.singletonList(15.99));

        OrderItem bookItem = new OrderItem();
        bookItem.setItem(book);
        bookItem.setQuantity(2);

        OrderItem coffeeItem = new OrderItem();
        coffeeItem.setItem(coffee);
        coffeeItem.setQuantity(1);

        orderItems.add(bookItem);
        orderItems.add(coffeeItem);

        String customerName = "John Doe";

        Order order = orderService.createOrder(customerName, orderItems);

        // Zakładamy, że metoda powinna zwrócić zamówienie
        assertThat(order).isNotNull();
        assertThat(order.getCustomerName()).isEqualTo(customerName);
    }

    @Test
    public void cancelOrder_shouldNotThrowException_whenValidIdProvided() {
        Long orderId = 1L;

        // Zakładamy, że metoda nie rzuca wyjątków
        orderService.cancelOrder(orderId);
    }

    @Test
    public void calculateTotalPrice_shouldReturnCorrectPrice_whenValidOrderIdProvided() {
        Long orderId = 1L;

        double totalPrice = orderService.calculateTotalPrice(orderId);

        // Zakładamy, że metoda powinna zwrócić poprawną całkowitą cenę
        assertThat(totalPrice).isEqualTo(100.0); // Przykładowa wartość
    }
}