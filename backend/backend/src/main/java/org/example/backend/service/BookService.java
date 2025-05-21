package org.example.backend.service;

import org.example.backend.dtos.BookListDTO;
import org.example.backend.entity.Book;
import org.example.backend.repository.BookRepository;
import org.example.backend.spec.BookSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Page<Book> getBooksFiltered(
            String genre,
            String language,
            String author,
            String search,
            Pageable pageable
    ) {
        Specification<Book> spec = Specification.where(null);

        if (genre != null) spec = spec.and(BookSpecification.hasGenre(genre));
        if (language != null) spec = spec.and(BookSpecification.hasLanguage(language));
        if (author != null) spec = spec.and(BookSpecification.hasAuthor(author));
        if (search != null && !search.isBlank()) spec = spec.and(BookSpecification.hasSearch(search));

        return bookRepository.findAll(spec, pageable);
    }

    private BookListDTO toDTO(Book book) {
        BookListDTO dto = new BookListDTO();
        dto.setId(book.getId());
        dto.setName(book.getName());
        dto.setAuthor(book.getAuthor());
        dto.setGenre(book.getGenre().toString());
        dto.setLanguage(book.getLanguage().toString());
        dto.setPrice(book.getPrice());
        dto.setImages(book.getImages());
        return dto;
    }
}