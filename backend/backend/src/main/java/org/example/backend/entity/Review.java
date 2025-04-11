package org.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Zakładamy, że encja User istnieje

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item; // Zakładamy, że encja Item istnieje

    @Column(length = 1000)
    private String content;

    private int rating;

    private LocalDate date;
}