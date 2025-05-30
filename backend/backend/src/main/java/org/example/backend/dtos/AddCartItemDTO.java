package org.example.backend.dtos;

import lombok.Data;

@Data
public class AddCartItemDTO {
    private Long itemId;
    private int quantity;
    private double price;
}