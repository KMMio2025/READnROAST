package org.example.backend.service.impl;

import org.example.backend.dtos.ProductListDTO;
import org.example.backend.entity.Book;
import org.example.backend.entity.Coffee;
import org.example.backend.enums.*;
import org.example.backend.repository.BookRepository;
import org.example.backend.repository.CoffeeRepository;
import org.example.backend.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

class ProductServiceImplTest {

    @Mock
    private BookRepository bookRepository;

    @Mock
    private CoffeeRepository coffeeRepository;

    @InjectMocks
    private ProductService productService;

    private Book book1;
    private Coffee coffee1;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        reset(bookRepository, coffeeRepository);

        book1 = new Book();
        book1.setId(1L);
        book1.setName("Władca Pierścieni"); // Pole "name" ustawione
        book1.setAuthor("J.R.R. Tolkien");
        book1.setGenre(Genre.FANTASY);
        book1.setLanguage(Language.POLISH);
        book1.setDescription("Epicka opowieść...");
        book1.setPrice(44.99);

        coffee1 = new Coffee();
        coffee1.setId(1L);
        coffee1.setName("Brazil Arabica"); // Pole "name" ustawione
        coffee1.setRoast(Roast.MEDIUM);
        coffee1.setFlavour(Flavour.CHOCOLATE);
        coffee1.setAroma(Aroma.FLORAL);
        coffee1.setAcidity(Acidity.LOW);
        coffee1.setMix(Mix.ARABICA);
        coffee1.setOrigin("BRAZIL");
        coffee1.setDescription("A smooth Brazilian coffee.");
        coffee1.setPrices(Collections.singletonList(19.99));
        coffee1.setSizes(List.of(250));
        coffee1.setNumberOfSizes(1);
    }

    @Test
    void getProductsFiltered_shouldReturnOnlyCoffees_whenTypeCoffee() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("name").ascending());
        when(coffeeRepository.findAll(argThat((Specification<Coffee> spec) -> true))).thenReturn(List.of(coffee1));

        Page<ProductListDTO> result = productService.getProductsFiltered(
                "coffee", null, null, null, null, null, null, null, null, null, null, pageable
        );

        assertThat(result.getContent()).allMatch(p -> "coffee".equals(p.getType()));
        assertThat(result.getContent()).allMatch(p -> p.getName() != null); // DODATKOWA OCHRONA
        verify(bookRepository, never()).findAll((Specification<Book>) any());
        verify(coffeeRepository).findAll(argThat((Specification<Coffee> spec) -> true));
    }

    @Test
    void getProductsFiltered_shouldReturnOnlyBooks_whenTypeBook() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("name").ascending());
        when(bookRepository.findAll(argThat((Specification<Book> spec) -> true))).thenReturn(List.of(book1));

        Page<ProductListDTO> result = productService.getProductsFiltered(
                "book", null, null, null, null, null, null, null, null, null, null, pageable
        );

        assertThat(result.getContent()).allMatch(p -> "book".equals(p.getType()));
        assertThat(result.getContent()).allMatch(p -> p.getName() != null); // DODATKOWA OCHRONA
        verify(coffeeRepository, never()).findAll((Specification<Coffee>) any());
        verify(bookRepository).findAll(argThat((Specification<Book> spec) -> true));
    }

    @Test
    void getProductPageById_shouldReturnBookDto_whenTypeIsBook() {
        when(bookRepository.findById(book1.getId())).thenReturn(Optional.of(book1));

        var dto = productService.getProductPageById(book1.getId(), "book");

        assertThat(dto.getId()).isEqualTo(book1.getId());
        assertThat(dto.getName()).isEqualTo(book1.getName());
        assertThat(dto.getType()).isEqualTo("book");
        assertThat(dto.getAuthor()).isEqualTo(book1.getAuthor());
        assertThat(dto.getGenre()).isEqualTo(book1.getGenre());
        verify(bookRepository).findById(book1.getId());
        verifyNoInteractions(coffeeRepository);
    }

    @Test
    void getProductPageById_shouldReturnCoffeeDto_whenTypeIsCoffee() {
        when(coffeeRepository.findById(coffee1.getId())).thenReturn(Optional.of(coffee1));

        var dto = productService.getProductPageById(coffee1.getId(), "coffee");

        assertThat(dto.getId()).isEqualTo(coffee1.getId());
        assertThat(dto.getName()).isEqualTo(coffee1.getName());
        assertThat(dto.getType()).isEqualTo("coffee");
        assertThat(dto.getOrigin()).isEqualTo(coffee1.getOrigin());
        assertThat(dto.getPrices()).isEqualTo(coffee1.getPrices());
        verify(coffeeRepository).findById(coffee1.getId());
        verifyNoInteractions(bookRepository);
    }
    @Test
    void getProductPageById_shouldThrow_whenBookNotFound() {
        when(bookRepository.findById(999L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> productService.getProductPageById(999L, "book"));
    }

    @Test
    void getProductPageById_shouldThrow_whenCoffeeNotFound() {
        when(coffeeRepository.findById(999L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> productService.getProductPageById(999L, "coffee"));
    }

    @Test
    void getProductPageById_shouldThrow_whenTypeUnknown() {
        assertThrows(IllegalArgumentException.class, () -> productService.getProductPageById(1L, "tea"));
    }


}