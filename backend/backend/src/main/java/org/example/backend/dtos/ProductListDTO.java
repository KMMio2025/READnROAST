package org.example.backend.dtos;

import lombok.Data;
import org.example.backend.entity.Image;

import java.util.List;

@Data
public class ProductListDTO {
    private Long id;
    private String name;
    private String type; // "coffee" lub "book"
    // Pola wspólne
    private Double price;
    private List<Image> images;

    // Pola dla kawy
    private String origin;
    private String roast;
    private String flavour;
    private String aroma;
    private String acidity;
    private String mix;
    private List<Integer> sizes;
    private List<Double> prices;

    // Pola dla książki
    private String author;
    private String genre;
    private String language;
}