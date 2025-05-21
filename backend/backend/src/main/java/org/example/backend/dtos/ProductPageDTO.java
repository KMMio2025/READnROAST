package org.example.backend.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.example.backend.entity.Image;
import org.example.backend.enums.*;

import java.util.List;

@Data
public class ProductPageDTO {
    private Long id;
    private String name;
    private String description;
    private int quantity;
    private List<Image> images;
    private String author;
    private Genre genre;
    private Language language;
    private double price;
    private String origin;
    private Roast roast;
    private Flavour flavour;
    private Aroma aroma;
    private Acidity acidity;
    private int numberOfSizes;
    private List<Integer> sizes;
    private Mix mix;
    private List<Double> prices;
    private String type;
}
