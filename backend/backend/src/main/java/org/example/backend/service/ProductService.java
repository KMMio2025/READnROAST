package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.ProductListDTO;
import org.example.backend.entity.Book;
import org.example.backend.entity.Coffee;
import org.example.backend.repository.BookRepository;
import org.example.backend.repository.CoffeeRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final CoffeeRepository coffeeRepository;
    private final BookRepository bookRepository;

    public Page<ProductListDTO> getProductList(Pageable pageable) {
        List<ProductListDTO> productList = new ArrayList<>();

        coffeeRepository.findAll().forEach(coffee -> productList.add(mapCoffee(coffee)));
        bookRepository.findAll().forEach(book -> productList.add(mapBook(book)));

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), productList.size());

        List<ProductListDTO> pageContent = productList.subList(start, end);
        return new PageImpl<>(pageContent, pageable, productList.size());
    }

    private ProductListDTO mapCoffee(Coffee coffee) {
        ProductListDTO dto = new ProductListDTO();
        dto.setId(coffee.getId());
        dto.setType("coffee");
        dto.setName(coffee.getName());
        dto.setOrigin(coffee.getOrigin());
        dto.setRoast(coffee.getRoast().toString());
        dto.setFlavour(coffee.getFlavour().toString());
        dto.setAroma(coffee.getAroma().toString());
        dto.setAcidity(coffee.getAcidity().toString());
        dto.setMix(coffee.getMix().toString());
        dto.setSizes(coffee.getSizes());
        dto.setPrices(coffee.getPrices());
        // cena domyślnie najniższa
        dto.setPrice(coffee.getPrices() != null && !coffee.getPrices().isEmpty() ? coffee.getPrices().get(0) : null);
        // TODO: Uzupełnij images
        return dto;
    }

    private ProductListDTO mapBook(Book book) {
        ProductListDTO dto = new ProductListDTO();
        dto.setId(book.getId());
        dto.setType("book");
        dto.setName(book.getName());
        dto.setAuthor(book.getAuthor());
        dto.setGenre(book.getGenre().toString());
        dto.setLanguage(book.getLanguage().toString());
        dto.setPrice(book.getPrice());
        // TODO: Uzupełnij images
        return dto;
    }
}