package org.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.backend.enums.*;

import java.util.List;

@Entity
public class Coffee extends Item {

    // Getters and Setters
    @Getter
    @Setter
    private String origin;

    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    private Roast roast;

    @Setter
    @Getter
    @Enumerated(EnumType.STRING)
    private Flavour flavour;

    @Setter
    @Getter
    @Enumerated(EnumType.STRING)
    private Aroma aroma;

    @Setter
    @Getter
    @Enumerated(EnumType.STRING)
    private Acidity acidity;

    @Setter
    @Getter
    private int numberOfSizes;

    @Setter
    @Getter
    @ElementCollection
    private List<Integer> sizes;

    @Setter
    @Getter
    @Enumerated(EnumType.STRING)
    private Mix mix;

    @ElementCollection
    private List<Double> prices;

    public double getPrice(int sizeIndex) {
        return prices.get(sizeIndex);
    }

    public void setPrice(List<Double> prices) {
        this.prices = prices;
    }
}