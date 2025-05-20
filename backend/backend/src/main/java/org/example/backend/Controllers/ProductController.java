package org.example.backend.Controllers;

import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.BookListDTO;
import org.example.backend.dtos.CoffeeListDTO;
import org.example.backend.dtos.ProductListDTO;
import org.example.backend.service.BookService;
import org.example.backend.service.CoffeeService;
import org.example.backend.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final CoffeeService coffeeService;
    private final BookService bookService;
    private final ProductService productService;

    //front ma robic wywolanie Get z parametrem page oraz size np. /api/products/coffee?page=0&size=10 (strona 0, 10 elementów na stronie)
    @GetMapping("/coffee")
    public Page<CoffeeListDTO> getCoffees(Pageable pageable) {
        return coffeeService.getCoffeeList(pageable);
    }

    @GetMapping("/books")
    public Page<BookListDTO> getBooks(Pageable pageable) {
        return bookService.getBookList(pageable);
    }

    @GetMapping("/all")
    public Page<ProductListDTO> getAllProducts(Pageable pageable) {
        return productService.getProductList(pageable);
    }
}