package org.example.backend.service;

import org.example.backend.entity.Order;
import org.example.backend.entity.OrderItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    public Order getOrderById(Long id) {
        return null;
    }

    public List<Order> getAllOrders() {
        return null;
    }

    public Order createOrder(String customerName, List<OrderItem> orderItems) {
        return null;
    }

    public void cancelOrder(Long id) {
    }

    public double calculateTotalPrice(Long orderId) {
        return 0.0;
    }
}