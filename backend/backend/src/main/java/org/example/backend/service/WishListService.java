package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.WishListDTO;
import org.example.backend.entity.Item;
import org.example.backend.entity.User;
import org.example.backend.entity.WishList;
import org.example.backend.entity.WishListItem;
import org.example.backend.repository.ItemRepository;
import org.example.backend.repository.UserRepository;
import org.example.backend.repository.WishListItemRepository;
import org.example.backend.repository.WishListRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;

@Service
@RequiredArgsConstructor
public class WishListService {

    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final WishListRepository wishListRepository;
    private final WishListItemRepository wishListItemRepository;

    @Transactional(readOnly = true)
    public WishListDTO getWishListForUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o podanym emailu"));
        WishList wishList = user.getWishList();
        return WishListDTO.fromEntity(wishList);
    }

    @Transactional
    public void addItem(String email, Long itemId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o podanym emailu"));
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono itemu"));
        WishList wishList = user.getWishList();

        boolean alreadyExists = wishList.getItems().stream()
                .anyMatch(wi -> wi.getItem().getId().equals(item.getId()));
        if (!alreadyExists) {
            WishListItem wishListItem = new WishListItem();
            wishListItem.setWishList(wishList);
            wishListItem.setItem(item);
            wishList.getItems().add(wishListItem); // dodaj do kolekcji!
            // orphanRemoval zadba o prawidłowe relacje
            wishListItemRepository.save(wishListItem);
        }
    }

    @Transactional
    public void removeItem(String email, Long itemId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o podanym emailu"));
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono itemu"));
        WishList wishList = user.getWishList();

        Iterator<WishListItem> iterator = wishList.getItems().iterator();
        while (iterator.hasNext()) {
            WishListItem wi = iterator.next();
            if (wi.getItem().getId().equals(item.getId())) {
                iterator.remove(); // usuń z kolekcji w WishList
                wishListItemRepository.delete(wi); // usuń z bazy
                break; // zakładam że item może być tylko raz
            }
        }
    }

    @Transactional
    public void clearWishList(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o podanym emailu"));
        WishList wishList = user.getWishList();

        // Usuwaj po kolei, by orphanRemoval zadbał o relacje
        Iterator<WishListItem> iterator = wishList.getItems().iterator();
        while (iterator.hasNext()) {
            WishListItem wi = iterator.next();
            iterator.remove();
            wishListItemRepository.delete(wi);
        }
    }
}