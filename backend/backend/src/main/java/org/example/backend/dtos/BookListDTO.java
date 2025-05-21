package org.example.backend.dtos;

import lombok.Data;
import org.example.backend.entity.Image;

import java.util.List;

@Data
public class BookListDTO {
    private Long id;
    private String name;
    private String author;
    private String genre;
    private String language;
    private Double price;
    private List<Image> images;
}