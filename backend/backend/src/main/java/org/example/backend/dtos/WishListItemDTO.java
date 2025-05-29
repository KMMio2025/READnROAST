package org.example.backend.dtos;

import lombok.Data;
import org.example.backend.entity.WishListItem;

@Data
public class WishListItemDTO {
    private Integer id;
    private Long itemId;
    private String itemName;

    public static WishListItemDTO fromEntity(WishListItem item) {
        WishListItemDTO dto = new WishListItemDTO();
        dto.setId(item.getId());
        dto.setItemId(item.getItem().getId());
        dto.setItemName(item.getItem().getName());
        return dto;
    }
}