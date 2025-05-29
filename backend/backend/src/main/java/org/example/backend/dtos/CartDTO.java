package org.example.backend.dtos;

import lombok.Data;
import org.example.backend.entity.Cart;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class CartDTO {
    private Long id;
    private List<CartItemDTO> items;

    public static CartDTO fromEntity(Cart cart) {
        CartDTO dto = new CartDTO();
        dto.setId(cart.getId());
        dto.setItems(cart.getItems().stream()
                .map(CartItemDTO::fromEntity)
                .collect(Collectors.toList()));
        return dto;
    }
}