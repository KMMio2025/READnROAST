package org.example.backend.service.impl;

import org.example.backend.dtos.BookListDTO;
import org.example.backend.entity.Book;
import org.example.backend.enums.Genre;
import org.example.backend.enums.Language;
import org.example.backend.repository.BookRepository;
import org.example.backend.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.data.domain.*;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookService bookService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    private Book createSampleBook() {
        Book book = new Book();
        book.setId(1L);
        book.setName("Władca Pierścieni");
        book.setAuthor("J.R.R. Tolkien");
        book.setGenre(Genre.FANTASY);
        book.setLanguage(Language.POLISH);
        book.setPrice(39.99);
        return book;
    }

    @Test
    void getBookList_shouldReturnMappedList() {
        Book book = createSampleBook();
        Page<Book> bookPage = new PageImpl<>(List.of(book));
        Pageable pageable = PageRequest.of(0, 10);

        when(bookRepository.findAll(pageable)).thenReturn(bookPage);

        Page<BookListDTO> result = bookService.getBookList(pageable);

        assertThat(result).isNotEmpty();
        BookListDTO dto = result.getContent().get(0);
        assertThat(dto.getName()).isEqualTo(book.getName());
        assertThat(dto.getAuthor()).isEqualTo(book.getAuthor());
        verify(bookRepository, times(1)).findAll(pageable);
    }
}