package org.example.backend.service;

import org.example.backend.dtos.BookListDTO;
import org.example.backend.entity.Book;
import org.example.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Page<BookListDTO> getBookList(Pageable pageable) {
        return bookRepository.findAll(pageable).map(this::toDTO);
    }

    private BookListDTO toDTO(Book book) {
        BookListDTO dto = new BookListDTO();
        dto.setId(book.getId());
        dto.setName(book.getName());
        dto.setAuthor(book.getAuthor());
        dto.setGenre(book.getGenre().toString());
        dto.setLanguage(book.getLanguage().toString());
        dto.setPrice(book.getPrice());
        // TODO: Uzupełnij images
        return dto;
    }
}