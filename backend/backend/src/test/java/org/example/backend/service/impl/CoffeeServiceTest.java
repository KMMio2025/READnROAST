package org.example.backend.service.impl;

import org.example.backend.entity.Coffee;
import org.example.backend.enums.*;
import org.example.backend.repository.CoffeeRepository;
import org.example.backend.service.CoffeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

public class CoffeeServiceTest {

    @Mock
    private CoffeeRepository coffeeRepository;

    @InjectMocks
    private CoffeeService coffeeService;

    private Coffee coffee;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        coffee = new Coffee();
        coffee.setId(1L); // Dodanie ID dla poprawności testów
        coffee.setOrigin("Colombia");
        coffee.setRoast(Roast.MEDIUM);
        coffee.setFlavour(Flavour.CHOCOLATE);
        coffee.setAroma(Aroma.SWEET);
        coffee.setAcidity(Acidity.MEDIUM);
        coffee.setNumberOfSizes(2);
        coffee.setSizes(List.of(250, 500)); // Rozmiary w gramach
        coffee.setMix(Mix.ARABICA);
        coffee.setPrice(List.of(5.99, 9.99));// ceny dla rozmiarow
    }

    @Test
    public void getAllCoffees_shouldReturnListOfCoffees() {
        when(coffeeRepository.findAll()).thenReturn(List.of(coffee));

        List<Coffee> coffees = coffeeService.getAllCoffees();

        assertThat(coffees).isNotEmpty();
        assertThat(coffees.size()).isEqualTo(1);
        assertThat(coffees.get(0).getOrigin()).isEqualTo("Colombia");

        verify(coffeeRepository, times(1)).findAll();
    }

    @Test
    public void getCoffeeById_shouldReturnCoffee_whenCoffeeExists() {
        when(coffeeRepository.findById(1L)).thenReturn(Optional.of(coffee));

        Coffee result = coffeeService.getCoffeeById(1L);

        assertThat(result).isNotNull();
        assertThat(result.getOrigin()).isEqualTo("Colombia");

        verify(coffeeRepository, times(1)).findById(1L);
    }

    @Test
    public void getCoffeeById_shouldThrowException_whenCoffeeDoesNotExist() {
        when(coffeeRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> coffeeService.getCoffeeById(1L))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Coffee not found");

        verify(coffeeRepository, times(1)).findById(1L);
    }

    @Test
    public void saveCoffee_shouldSaveAndReturnCoffee() {
        when(coffeeRepository.save(coffee)).thenReturn(coffee);

        Coffee result = coffeeService.saveCoffee(coffee);

        assertThat(result).isNotNull();
        assertThat(result.getOrigin()).isEqualTo("Colombia");

        verify(coffeeRepository, times(1)).save(coffee);
    }

    @Test
    public void saveCoffee_shouldThrowException_whenCoffeeIsNull() {
        assertThatThrownBy(() -> coffeeService.saveCoffee(null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Coffee cannot be null");

        verify(coffeeRepository, never()).save(any());
    }

    @Test
    public void deleteCoffee_shouldDeleteCoffee_whenCoffeeExists() {
        when(coffeeRepository.existsById(1L)).thenReturn(true);

        coffeeService.deleteCoffee(1L);

        verify(coffeeRepository, times(1)).deleteById(1L);
    }

    @Test
    public void deleteCoffee_shouldThrowException_whenCoffeeDoesNotExist() {
        when(coffeeRepository.existsById(1L)).thenReturn(false);

        assertThatThrownBy(() -> coffeeService.deleteCoffee(1L))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Coffee not found");

        verify(coffeeRepository, never()).deleteById(any());
    }
}