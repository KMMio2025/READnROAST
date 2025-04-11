package org.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false) // Klucz obcy do tabeli Cart
    private Cart cart;

    @ManyToOne
    private Book book;

    @ManyToOne
    private Coffee coffee;

    private int quantity;

    public Item getItem() {
        return this.book != null ? this.book : this.coffee;
    }
}