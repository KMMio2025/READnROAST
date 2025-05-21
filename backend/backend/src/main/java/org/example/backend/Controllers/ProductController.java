package org.example.backend.Controllers;

import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.BookListDTO;
import org.example.backend.dtos.CoffeeListDTO;
import org.example.backend.dtos.ProductListDTO;
import org.example.backend.entity.Book;
import org.example.backend.entity.Coffee;
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

    //przykladowe wywolanie endpontu: /api/products/coffee?roast=LIGHT&flavour=CHOCOLATE&aroma=FLORAL&acidity=HIGH&mix=ARABICA&origin=ETHIOPIA&search=espresso&page=0&size=10&sort=price,asc
    @GetMapping("/coffee")
    public Page<Coffee> getCoffees(
            @RequestParam(required = false) String roast,
            @RequestParam(required = false) String flavour,
            @RequestParam(required = false) String aroma,
            @RequestParam(required = false) String acidity,
            @RequestParam(required = false) String mix,
            @RequestParam(required = false) String origin,
            @RequestParam(required = false) String search,
            Pageable pageable
    ) {
        return coffeeService.getCoffeesFiltered(roast, flavour, aroma, acidity, mix, origin, search, pageable);
    }


    //przykladowe wywolanie endpontu: /api/products/books?genre=FANTASY&language=POLISH&author=Tolkien&search=Wladca&page=0&size=10&sort=price,asc
    @GetMapping("/books")
    public Page<Book> getBooks(
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String search,
            Pageable pageable
    ) {
        return bookService.getBooksFiltered(genre, language, author, search, pageable);
    }

    //przykladowe wywolanie endpontu: /api/products/all?type=coffee&roast=LIGHT&flavour=CHOCOLATE&aroma=FLORAL&acidity=HIGH&mix=ARABICA&origin=ETHIOPIA&search=espresso&page=0&size=10&sort=price,asc
    @GetMapping("/all")
    public Page<ProductListDTO> getProducts(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) String roast,
            @RequestParam(required = false) String flavour,
            @RequestParam(required = false) String aroma,
            @RequestParam(required = false) String acidity,
            @RequestParam(required = false) String mix,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String origin,
            @RequestParam(required = false) String search,
            Pageable pageable
    ) {
        return productService.getProductsFiltered(
                type, genre, language, roast, flavour, aroma, acidity, mix, author, origin, search, pageable
        );
    }
}