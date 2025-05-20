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
import org.mockito.*;
import org.springframework.data.domain.*;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @Mock
    private CoffeeRepository coffeeRepository;
    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    private Coffee createSampleCoffee() {
        Coffee coffee = new Coffee();
        coffee.setId(2L);
        coffee.setName("Brazil Santos");
        coffee.setOrigin("Brazil");
        coffee.setRoast(Roast.DARK);
        coffee.setFlavour(Flavour.NUTTY);
        coffee.setAroma(Aroma.SPICY);
        coffee.setAcidity(Acidity.LOW);
        coffee.setMix(Mix.ARABICA);
        coffee.setSizes(List.of(250, 500));
        coffee.setPrices(List.of(19.99, 35.99));
        return coffee;
    }

    private Book createSampleBook() {
        Book book = new Book();
        book.setId(3L);
        book.setName("Metro 2033");
        book.setAuthor("Dmitry Glukhovsky");
        book.setGenre(Genre.SCIENCE_FICTION);
        book.setLanguage(Language.POLISH);
        book.setPrice(35.20);
        return book;
    }

    @Test
    void getProductList_shouldReturnMappedProducts() {
        Coffee coffee = createSampleCoffee();
        Book book = createSampleBook();

        when(coffeeRepository.findAll()).thenReturn(List.of(coffee));
        when(bookRepository.findAll()).thenReturn(List.of(book));

        Pageable pageable = PageRequest.of(0, 10);
        Page<ProductListDTO> result = productService.getProductList(pageable);

        assertThat(result).isNotEmpty();
        assertThat(result.getContent()).anySatisfy(dto -> {
            assertThat(dto.getName()).isIn(coffee.getName(), book.getName());
            assertThat(dto.getType()).isIn("coffee", "book");
        });
        verify(coffeeRepository, times(1)).findAll();
        verify(bookRepository, times(1)).findAll();
    }
}