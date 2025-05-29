package org.example.backend.dtos;

import lombok.Data;
import org.example.backend.entity.CartItem;

@Data
public class CartItemDTO {
    private Long id;
    private Long itemId;
    private String itemName;
    private int quantity;

    public static CartItemDTO fromEntity(CartItem item) {
        CartItemDTO dto = new CartItemDTO();
        dto.setId(item.getId());
        dto.setItemId(item.getItem().getId());
        dto.setItemName(item.getItem().getName());
        dto.setQuantity(item.getQuantity());
        return dto;
    }
}