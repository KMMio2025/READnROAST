package org.example.backend.spec;

import org.example.backend.entity.Book;
import org.springframework.data.jpa.domain.Specification;

public class BookSpecification {

    public static Specification<Book> hasGenre(String genre) {
        return (root, query, cb) ->
                genre == null ? null : cb.equal(root.get("genre").as(String.class), genre);
    }

    public static Specification<Book> hasLanguage(String language) {
        return (root, query, cb) ->
                language == null ? null : cb.equal(root.get("language").as(String.class), language);
    }

    public static Specification<Book> hasAuthor(String author) {
        return (root, query, cb) ->
                author == null ? null : cb.like(cb.lower(root.get("author")), "%" + author.toLowerCase() + "%");
    }

    public static Specification<Book> hasSearch(String search) {
        return (root, query, cb) -> {
            if (search == null || search.isBlank()) return null;
            String like = "%" + search.toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(root.get("name")), like),
                    cb.like(cb.lower(root.get("description")), like),
                    cb.like(cb.lower(root.get("author")), like)
            );
        };
    }
}