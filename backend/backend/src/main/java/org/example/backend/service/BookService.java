package org.example.backend.service;

import org.example.backend.entity.Book;
import org.example.backend.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        return null;
    }

    public Book getBookById(Long id) {
        return null;
    }

    public Book saveBook(Book book) {
        return null;
    }

    public void deleteBook(Long id) {
    }
}