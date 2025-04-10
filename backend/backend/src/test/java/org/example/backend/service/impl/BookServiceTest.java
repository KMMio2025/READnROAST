package org.example.backend.service.impl;

import org.example.backend.entity.Book;
import org.example.backend.repository.BookRepository;
import org.example.backend.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

public class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookService bookService;

    private Book book;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        book = new Book();
        book.setId(1L);
        book.setName("Test Book");
        book.setAuthor("Test Author");
        book.setPrice(19.99);
        book.setQuantity(10);
    }

    @Test
    public void getAllBooks_shouldReturnListOfBooks() {
        when(bookRepository.findAll()).thenReturn(List.of(book));

        List<Book> books = bookService.getAllBooks();

        assertThat(books).isNotEmpty();
        assertThat(books.size()).isEqualTo(1);
        assertThat(books.get(0).getName()).isEqualTo("Test Book");

        verify(bookRepository, times(1)).findAll();
    }

    @Test
    public void getBookById_shouldReturnBook_whenBookExists() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

        Book result = bookService.getBookById(1L);

        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Test Book");

        verify(bookRepository, times(1)).findById(1L);
    }

    @Test
    public void getBookById_shouldThrowException_whenBookDoesNotExist() {
        when(bookRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> bookService.getBookById(1L))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Book not found");

        verify(bookRepository, times(1)).findById(1L);
    }

    @Test
    public void saveBook_shouldSaveAndReturnBook() {
        when(bookRepository.save(book)).thenReturn(book);

        Book result = bookService.saveBook(book);

        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Test Book");

        verify(bookRepository, times(1)).save(book);
    }

    @Test
    public void saveBook_shouldThrowException_whenBookIsNull() {
        assertThatThrownBy(() -> bookService.saveBook(null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Book cannot be null");

        verify(bookRepository, never()).save(any());
    }

    @Test
    public void deleteBook_shouldDeleteBook_whenBookExists() {
        when(bookRepository.existsById(1L)).thenReturn(true);

        bookService.deleteBook(1L);

        verify(bookRepository, times(1)).deleteById(1L);
    }

    @Test
    public void deleteBook_shouldThrowException_whenBookDoesNotExist() {
        when(bookRepository.existsById(1L)).thenReturn(false);

        assertThatThrownBy(() -> bookService.deleteBook(1L))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Book not found");

        verify(bookRepository, never()).deleteById(any());
    }
}