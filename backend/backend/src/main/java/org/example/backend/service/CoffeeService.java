package org.example.backend.service;

import org.example.backend.dtos.CoffeeListDTO;
import org.example.backend.entity.Coffee;
import org.example.backend.repository.CoffeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CoffeeService {

    @Autowired
    private CoffeeRepository coffeeRepository;

    public Page<CoffeeListDTO> getCoffeeList(Pageable pageable) {
        return coffeeRepository.findAll(pageable).map(this::toDTO);
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
        // TODO: Uzupełnij images
        return dto;
    }
}