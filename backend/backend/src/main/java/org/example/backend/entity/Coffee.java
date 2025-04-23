package org.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.backend.enums.*;

import java.util.List;

@Entity
@Getter
@Setter
public class Coffee extends Item {


    private String origin;

    @Enumerated(EnumType.STRING)
    private Roast roast;

    @Enumerated(EnumType.STRING)
    private Flavour flavour;

    @Enumerated(EnumType.STRING)
    private Aroma aroma;

    @Enumerated(EnumType.STRING)
    private Acidity acidity;

    private int numberOfSizes;

    @ElementCollection
    private List<Integer> sizes;

    @Enumerated(EnumType.STRING)
    private Mix mix;

    @ElementCollection
    private List<Double> prices;
    @Id
    private Long id;

    public double getPrice(int sizeIndex) {
        return prices.get(sizeIndex);
    }

    public void setPrice(List<Double> prices) {
        this.prices = prices;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }
}