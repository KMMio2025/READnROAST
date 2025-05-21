package org.example.backend.service.impl;

import org.example.backend.entity.Book;
import org.example.backend.enums.Genre;
import org.example.backend.enums.Language;
import org.example.backend.repository.BookRepository;
import org.example.backend.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class BookServiceImplTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookService bookService;

    private Book book1;
    private Book book2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        book1 = new Book();
        book1.setId(1L);
        book1.setName("Władca Pierścieni");
        book1.setAuthor("J.R.R. Tolkien");
        book1.setGenre(Genre.FANTASY);
        book1.setLanguage(Language.POLISH);
        book1.setDescription("Epicka opowieść...");

        book2 = new Book();
        book2.setId(2L);
        book2.setName("Hobbit");
        book2.setAuthor("J.R.R. Tolkien");
        book2.setGenre(Genre.FANTASY);
        book2.setLanguage(Language.POLISH);
        book2.setDescription("Prequel do Władcy Pierścieni...");
    }

    @Test
    void getBooksFiltered_shouldReturnFilteredBooks_byGenreAndAuthor() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("name").ascending());
        Page<Book> page = new PageImpl<>(List.of(book1), pageable, 1);

        when(bookRepository.findAll(any(Specification.class), eq(pageable))).thenReturn(page);

        Page<Book> result = bookService.getBooksFiltered("FANTASY", null, "Tolkien", null, pageable);

        assertThat(result).isNotEmpty();
        assertThat(result.getContent()).allSatisfy(book ->
                assertThat(book.getAuthor()).containsIgnoringCase("Tolkien")
        );
        verify(bookRepository, times(1)).findAll(any(Specification.class), eq(pageable));
    }

    @Test
    void getBooksFiltered_shouldReturnAllBooks_whenNoFilters() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Book> page = new PageImpl<>(List.of(book1, book2), pageable, 2);

        when(bookRepository.findAll(any(Specification.class), eq(pageable))).thenReturn(page);

        Page<Book> result = bookService.getBooksFiltered(null, null, null, null, pageable);

        assertThat(result.getContent()).containsExactly(book1, book2);
        verify(bookRepository, times(1)).findAll(any(Specification.class), eq(pageable));
    }

    @Test
    void getBooksFiltered_shouldReturnBooksBySearch() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Book> page = new PageImpl<>(List.of(book1), pageable, 1);

        when(bookRepository.findAll(any(Specification.class), eq(pageable))).thenReturn(page);

        Page<Book> result = bookService.getBooksFiltered(null, null, null, "władca", pageable);

        assertThat(result.getContent()).containsExactly(book1);
        verify(bookRepository).findAll(any(Specification.class), eq(pageable));
    }
}