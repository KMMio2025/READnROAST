package org.example.backend.service.impl;

import org.example.backend.entity.WishList;
import org.example.backend.repository.WishListRepository;
import org.example.backend.service.WishListService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class WishListServiceTest {

    @Mock
    private WishListRepository wishListRepository;

    @InjectMocks
    private WishListService wishListService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void createWishList_shouldReturnCreatedWishList_whenValidDataProvided() {
        WishList wishList = new WishList();
        wishList.setId(1);

        when(wishListRepository.save(wishList)).thenReturn(wishList);

        WishList createdWishList = wishListService.createWishList(wishList);

        assertThat(createdWishList).isNotNull();
        assertThat(createdWishList.getId()).isEqualTo(1);

        verify(wishListRepository, times(1)).save(wishList);
    }

    @Test
    public void getWishListById_shouldReturnWishList_whenWishListExists() {
        WishList wishList = new WishList();
        wishList.setId(1);

        when(wishListRepository.findById(1)).thenReturn(Optional.of(wishList));

        Optional<WishList> retrievedWishList = wishListService.getWishListById(1);

        assertThat(retrievedWishList).isPresent();
        assertThat(retrievedWishList.get().getId()).isEqualTo(1);

        verify(wishListRepository, times(1)).findById(1);
    }

    @Test
    public void updateWishList_shouldReturnUpdatedWishList_whenValidDataProvided() {
        WishList existingWishList = new WishList();
        existingWishList.setId(1);

        WishList updatedWishList = new WishList();
        updatedWishList.setId(1);

        when(wishListRepository.findById(1)).thenReturn(Optional.of(existingWishList));
        when(wishListRepository.save(existingWishList)).thenReturn(existingWishList);

        WishList result = wishListService.updateWishList(1, updatedWishList);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1);

        verify(wishListRepository, times(1)).findById(1);
        verify(wishListRepository, times(1)).save(existingWishList);
    }

    @Test
    public void deleteWishList_shouldCallRepositoryDelete_whenWishListExists() {
        WishList wishList = new WishList();
        wishList.setId(1);

        when(wishListRepository.findById(1)).thenReturn(Optional.of(wishList));

        wishListService.deleteWishList(1);

        verify(wishListRepository, times(1)).findById(1);
        verify(wishListRepository, times(1)).delete(wishList);
    }

//    @Test
//    public void addItemToWishList_shouldNotThrowException_whenValidDataProvided() {
//        wishListService.addItemToWishList(1, 100);
//    }
//
//    @Test
//    public void removeItemFromWishList_shouldNotThrowException_whenValidDataProvided() {
//        wishListService.removeItemFromWishList(1, 100);
//    }
}