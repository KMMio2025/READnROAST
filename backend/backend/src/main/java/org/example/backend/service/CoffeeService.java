package org.example.backend.service;

import org.example.backend.dtos.CoffeeListDTO;
import org.example.backend.entity.Coffee;
import org.example.backend.repository.CoffeeRepository;
import org.example.backend.spec.CoffeeSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class CoffeeService {

    @Autowired
    private CoffeeRepository coffeeRepository;

    public Page<Coffee> getCoffeesFiltered(
            String roast,
            String flavour,
            String aroma,
            String acidity,
            String mix,
            String origin,
            String search,
            Pageable pageable
    ) {
        Specification<Coffee> spec = Specification.where(null);

        if (roast != null) spec = spec.and(CoffeeSpecification.hasRoast(roast));
        if (flavour != null) spec = spec.and(CoffeeSpecification.hasFlavour(flavour));
        if (aroma != null) spec = spec.and(CoffeeSpecification.hasAroma(aroma));
        if (acidity != null) spec = spec.and(CoffeeSpecification.hasAcidity(acidity));
        if (mix != null) spec = spec.and(CoffeeSpecification.hasMix(mix));
        if (origin != null) spec = spec.and(CoffeeSpecification.hasOrigin(origin));
        if (search != null && !search.isBlank()) spec = spec.and(CoffeeSpecification.hasSearch(search));

        return coffeeRepository.findAll(spec, pageable);
    }

    private CoffeeListDTO toDTO(Coffee coffee) {
        CoffeeListDTO dto = new CoffeeListDTO();
        dto.setId(coffee.getId());
        dto.setName(coffee.getName());
        dto.setOrigin(coffee.getOrigin());
        dto.setRoast(coffee.getRoast().toString());
        dto.setFlavour(coffee.getFlavour().toString());
        dto.setAroma(coffee.getAroma().toString());
        dto.setAcidity(coffee.getAcidity().toString());
        dto.setMix(coffee.getMix().toString());
        dto.setSizes(coffee.getSizes());
        dto.setPrices(coffee.getPrices());
        dto.setImages(coffee.getImages());
        return dto;
    }
}