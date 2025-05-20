package org.example.backend.dtos;

import lombok.Data;
import java.util.List;

@Data
public class BookListDTO {
    private Long id;
    private String name;
    private String author;
    private String genre;
    private String language;
    private Double price;
    private List<String> images;
}