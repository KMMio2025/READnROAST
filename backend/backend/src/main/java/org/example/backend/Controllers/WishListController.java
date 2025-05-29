package org.example.backend.Controllers;

import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.WishListDTO;
import org.example.backend.dtos.WishListItemDTO;
import org.example.backend.entity.AuthResponse;
import org.example.backend.entity.Code;
import org.example.backend.service.WishListService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishListController {

    private final WishListService wishListService;

    @GetMapping
    public ResponseEntity<WishListDTO> getWishList() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        WishListDTO wishListDTO = wishListService.getWishListForUser(email);
        return ResponseEntity.ok(wishListDTO);
    }

    @PostMapping("/add")
    public ResponseEntity<AuthResponse> addItem(@RequestBody WishListItemDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        wishListService.addItem(email, dto.getItemId());
        return ResponseEntity.ok(new AuthResponse(Code.SUCCESS));
    }

    @PostMapping("/remove")
    public ResponseEntity<AuthResponse> removeItem(@RequestBody WishListItemDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        wishListService.removeItem(email, dto.getItemId());
        return ResponseEntity.ok(new AuthResponse(Code.SUCCESS));
    }

    @PostMapping("/clear")
    public ResponseEntity<AuthResponse> clearWishList() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        wishListService.clearWishList(email);
        return ResponseEntity.ok(new AuthResponse(Code.SUCCESS));
    }
}