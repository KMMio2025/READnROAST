package org.example.backend.repository;

import org.example.backend.entity.WishList;
import org.example.backend.entity.WishListItem;
import org.example.backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WishListItemRepository extends JpaRepository<WishListItem, Integer> {
    Optional<WishListItem> findByWishListAndItem(WishList wishList, Item item);
}