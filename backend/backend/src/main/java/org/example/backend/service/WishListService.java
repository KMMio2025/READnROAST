package org.example.backend.service;

import org.example.backend.entity.WishList;
import org.example.backend.repository.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WishListService {

    @Autowired
    private WishListRepository wishListRepository;

    public WishList createWishList(WishList wishList) {
        return null;
    }

    public Optional<WishList> getWishListById(int id) {
        return Optional.empty();
    }

    public WishList updateWishList(int id, WishList updatedWishList) {
        return null;
    }

    public void deleteWishList(int id) {
    }

    public void addItemToWishList(int wishListId, int itemId) {
    }

    public void removeItemFromWishList(int wishListId, int itemId) {
    }
}