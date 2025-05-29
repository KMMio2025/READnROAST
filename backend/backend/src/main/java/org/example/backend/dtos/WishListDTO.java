package org.example.backend.dtos;

import lombok.Data;
import org.example.backend.entity.WishList;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class WishListDTO {
    private Integer id;
    private List<WishListItemDTO> items;

    public static WishListDTO fromEntity(WishList wishList) {
        WishListDTO dto = new WishListDTO();
        dto.setId(wishList.getId());
        dto.setItems(wishList.getItems().stream()
                .map(WishListItemDTO::fromEntity)
                .collect(Collectors.toList()));
        return dto;
    }
}