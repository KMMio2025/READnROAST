package org.example.backend.dtos;

import lombok.Data;
import org.example.backend.entity.Image;

import java.util.List;

@Data
public class CoffeeListDTO {
    private Long id;
    private String name;
    private String origin;
    private String roast;
    private String flavour;
    private String aroma;
    private String acidity;
    private String mix;
    private List<Integer> sizes;
    private List<Double> prices;
    private List<Image> images;
}