package org.example.backend.Controllers;

import org.example.backend.entity.CartItem;
import org.example.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // Endpoint: GET /cart/{userId}
    @GetMapping("/{userId}")
    public List<CartItem> getCartItemsByUser(@PathVariable Long userId) {
        return cartService.getCartItems(userId);
    }

    // POST /cart/add?itemId=123&quantity=2
    @PostMapping("/add")
    public void addToCart(
            @RequestParam Long itemId,
            @RequestParam(defaultValue = "1") int quantity
    ) {
        cartService.addItemToCart(itemId, quantity);
    }

    // DELETE /cart/remove?itemId=123
    @DeleteMapping("/remove")
    public void removeFromCart(@RequestParam Long itemId) {
        cartService.removeItemFromCart(itemId);
    }
}