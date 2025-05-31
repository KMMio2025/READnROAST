package org.example.backend.Controllers;

import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.AddCartItemDTO;
import org.example.backend.dtos.CartDTO;
import org.example.backend.entity.AuthResponse;
import org.example.backend.entity.Code;
import org.example.backend.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartDTO> getCart() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        CartDTO cartDTO = cartService.getCartForUser(email);
        return ResponseEntity.ok(cartDTO);
    }

    @PostMapping("/add")
    public ResponseEntity<AuthResponse> addItem(@RequestBody AddCartItemDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        cartService.addItem(email, dto.getItemId(), dto.getQuantity(), dto.getPrice());
        return ResponseEntity.ok(new AuthResponse(Code.SUCCESS));
    }

    @PostMapping("/remove")
    public ResponseEntity<AuthResponse> removeItem(@RequestBody AddCartItemDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        cartService.removeItem(email, dto.getItemId());
        return ResponseEntity.ok(new AuthResponse(Code.SUCCESS));
    }//

    @PostMapping("/update")
    public ResponseEntity<AuthResponse> updateItem(@RequestBody AddCartItemDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        cartService.updateItem(email, dto.getItemId(), dto.getQuantity());
        return ResponseEntity.ok(new AuthResponse(Code.SUCCESS));
    }

    @PostMapping("/clear")
    public ResponseEntity<AuthResponse> clearCart() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        cartService.clearCart(email);
        return ResponseEntity.ok(new AuthResponse(Code.SUCCESS));
    }
}