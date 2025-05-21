package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.ProductListDTO;
import org.example.backend.dtos.ProductPageDTO;
import org.example.backend.entity.Book;
import org.example.backend.entity.Coffee;
import org.example.backend.repository.BookRepository;
import org.example.backend.repository.CoffeeRepository;
import org.example.backend.spec.BookSpecification;
import org.example.backend.spec.CoffeeSpecification;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final CoffeeRepository coffeeRepository;
    private final BookRepository bookRepository;

    public Page<ProductListDTO> getProductsFiltered(
            String type,
            String genre,
            String language,
            String roast,
            String flavour,
            String aroma,
            String acidity,
            String mix,
            String author,
            String origin,
            String search,
            Pageable pageable
    ) {
        List<ProductListDTO> allProducts = new ArrayList<>();

        // BOOKS
        if (type == null || type.equalsIgnoreCase("book") || type.equalsIgnoreCase("all")) {
            Specification<Book> bookSpec = Specification.where(null);
            if (genre != null) bookSpec = bookSpec.and(BookSpecification.hasGenre(genre));
            if (language != null) bookSpec = bookSpec.and(BookSpecification.hasLanguage(language));
            if (author != null) bookSpec = bookSpec.and(BookSpecification.hasAuthor(author));
            if (search != null && !search.isBlank()) bookSpec = bookSpec.and(BookSpecification.hasSearch(search));
            List<Book> books = bookRepository.findAll(bookSpec);
            allProducts.addAll(books.stream().map(this::mapBook).toList());
        }

        // COFFEE
        if (type == null || type.equalsIgnoreCase("coffee") || type.equalsIgnoreCase("all")) {
            Specification<Coffee> coffeeSpec = Specification.where(null);
            if (roast != null) coffeeSpec = coffeeSpec.and(CoffeeSpecification.hasRoast(roast));
            if (flavour != null) coffeeSpec = coffeeSpec.and(CoffeeSpecification.hasFlavour(flavour));
            if (aroma != null) coffeeSpec = coffeeSpec.and(CoffeeSpecification.hasAroma(aroma));
            if (acidity != null) coffeeSpec = coffeeSpec.and(CoffeeSpecification.hasAcidity(acidity));
            if (mix != null) coffeeSpec = coffeeSpec.and(CoffeeSpecification.hasMix(mix));
            if (origin != null) coffeeSpec = coffeeSpec.and(CoffeeSpecification.hasOrigin(origin));
            if (search != null && !search.isBlank()) coffeeSpec = coffeeSpec.and(CoffeeSpecification.hasSearch(search));
            List<Coffee> coffees = coffeeRepository.findAll(coffeeSpec);
            allProducts.addAll(coffees.stream().map(this::mapCoffee).toList());
        }

        // SORTING
        Comparator<ProductListDTO> comparator = Comparator.comparing(ProductListDTO::getId);
        if (pageable.getSort().isSorted()) {
            for (Sort.Order order : pageable.getSort()) {
                Comparator<ProductListDTO> current;
                switch (order.getProperty()) {
                    case "name":
                        current = Comparator.comparing(ProductListDTO::getName, Comparator.nullsLast(String::compareToIgnoreCase));
                        break;
                    case "price":
                        current = Comparator.comparing(ProductListDTO::getPrice, Comparator.nullsLast(Double::compareTo));
                        break;
                    default:
                        current = Comparator.comparing(ProductListDTO::getId);
                }
                comparator = order.isAscending() ? comparator.thenComparing(current) : comparator.thenComparing(current.reversed());
            }
        }
        allProducts.sort(comparator);

        // PAGINATION
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), allProducts.size());
        List<ProductListDTO> pageContent = (start > end) ? Collections.emptyList() : allProducts.subList(start, end);

        return new PageImpl<>(pageContent, pageable, allProducts.size());
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
        dto.setImages(coffee.getImages());
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
        dto.setImages(book.getImages());
        return dto;
    }


    @Transactional(readOnly = true)
    public ProductPageDTO getProductPageById(Long id, String type) {
        if ("book".equalsIgnoreCase(type)) {
            Book book = bookRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Book not found"));
            return mapBookToPageDto(book);
        } else if ("coffee".equalsIgnoreCase(type)) {
            Coffee coffee = coffeeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Coffee not found"));
            return mapCoffeeToPageDto(coffee);
        } else {
            throw new IllegalArgumentException("Invalid product type: " + type);
        }
    }

    private ProductPageDTO mapBookToPageDto(Book book) {
        ProductPageDTO dto = new ProductPageDTO();
        dto.setId(book.getId());
        dto.setName(book.getName());
        dto.setDescription(book.getDescription());
        dto.setQuantity(book.getQuantity());
        dto.setImages(book.getImages());
        dto.setAuthor(book.getAuthor());
        dto.setGenre(book.getGenre());
        dto.setLanguage(book.getLanguage());
        dto.setPrice(book.getPrice());
        dto.setType("book");
        return dto;
    }

    private ProductPageDTO mapCoffeeToPageDto(Coffee coffee) {
        ProductPageDTO dto = new ProductPageDTO();
        dto.setId(coffee.getId());
        dto.setName(coffee.getName());
        dto.setDescription(coffee.getDescription());
        dto.setQuantity(coffee.getQuantity());
        dto.setImages(coffee.getImages());
        dto.setOrigin(coffee.getOrigin());
        dto.setRoast(coffee.getRoast());
        dto.setFlavour(coffee.getFlavour());
        dto.setAroma(coffee.getAroma());
        dto.setAcidity(coffee.getAcidity());
        dto.setNumberOfSizes(coffee.getNumberOfSizes());
        dto.setSizes(coffee.getSizes());
        dto.setMix(coffee.getMix());
        dto.setPrices(coffee.getPrices());
        dto.setPrice(coffee.getPrices() != null && !coffee.getPrices().isEmpty() ? coffee.getPrices().get(0) : null);
        dto.setType("coffee");
        return dto;
    }


}