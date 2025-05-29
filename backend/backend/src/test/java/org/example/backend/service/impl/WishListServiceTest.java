package org.example.backend.service.impl;

import org.example.backend.entity.*;
import org.example.backend.repository.*;
import org.example.backend.service.WishListService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class WishListServiceTest {

    private UserRepository userRepository;
    private ItemRepository itemRepository;
    private WishListRepository wishListRepository;
    private WishListItemRepository wishListItemRepository;
    private WishListService wishListService;

    @BeforeEach
    void setup() {
        userRepository = mock(UserRepository.class);
        itemRepository = mock(ItemRepository.class);
        wishListRepository = mock(WishListRepository.class);
        wishListItemRepository = mock(WishListItemRepository.class);

        wishListService = new WishListService(
                userRepository, itemRepository, wishListRepository, wishListItemRepository
        );
    }

    @Test
    void addItem_addsItemToWishList() {
        // Arrange
        String email = "test@example.com";
        Long itemId = 2L;
        User user = new User();
        user.setEmail(email);
        WishList wishList = new WishList();
        wishList.setItems(new ArrayList<>());
        user.setWishList(wishList);

        Item item = mock(Item.class);
        when(item.getId()).thenReturn(itemId);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(itemRepository.findById(itemId)).thenReturn(Optional.of(item));

        // Act
        wishListService.addItem(email, itemId);

        // Assert
        ArgumentCaptor<WishListItem> captor = ArgumentCaptor.forClass(WishListItem.class);
        verify(wishListItemRepository).save(captor.capture());
        WishListItem saved = captor.getValue();
        assertThat(saved.getItem()).isEqualTo(item);
        assertThat(saved.getWishList()).isEqualTo(wishList);
    }

    @Test
    void removeItem_removesItemFromWishList() {
        // Arrange
        String email = "test@example.com";
        Long itemId = 2L;
        User user = new User();
        user.setEmail(email);
        WishList wishList = new WishList();
        user.setWishList(wishList);

        Item item = mock(Item.class);
        when(item.getId()).thenReturn(itemId);

        WishListItem wishListItem = new WishListItem();
        wishListItem.setWishList(wishList);
        wishListItem.setItem(item);

        List<WishListItem> items = new ArrayList<>();
        items.add(wishListItem);
        wishList.setItems(items);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(itemRepository.findById(itemId)).thenReturn(Optional.of(item));

        // Act
        wishListService.removeItem(email, itemId);

        // Assert
        verify(wishListItemRepository).delete(wishListItem);
        assertThat(wishList.getItems()).doesNotContain(wishListItem);
    }
}