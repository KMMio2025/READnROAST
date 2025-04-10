package org.example.backend.service;

import org.example.backend.entity.Coffee;
import org.example.backend.repository.CoffeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoffeeService {

    private final CoffeeRepository coffeeRepository;

    public CoffeeService(CoffeeRepository coffeeRepository) {
        this.coffeeRepository = coffeeRepository;
    }

    public List<Coffee> getAllCoffees() {
        return null;
    }

    public Coffee getCoffeeById(Long id) {
        return null;
    }

    public Coffee saveCoffee(Coffee coffee) {
        return null;
    }

    public void deleteCoffee(Long id) {
    }
}