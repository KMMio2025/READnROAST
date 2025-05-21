package org.example.backend.service.impl;

import org.example.backend.entity.Coffee;
import org.example.backend.enums.Roast;
import org.example.backend.enums.Flavour;
import org.example.backend.enums.Aroma;
import org.example.backend.enums.Acidity;
import org.example.backend.enums.Mix;
import org.example.backend.repository.CoffeeRepository;
import org.example.backend.service.CoffeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class CoffeeServiceImplTest {

    @Mock
    private CoffeeRepository coffeeRepository;

    @InjectMocks
    private CoffeeService coffeeService;

    private Coffee coffee1;
    private Coffee coffee2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        coffee1 = new Coffee();
        coffee1.setId(1L);
        coffee1.setName("Brazil Arabica");
        coffee1.setRoast(Roast.MEDIUM);
        coffee1.setFlavour(Flavour.CHOCOLATE);
        coffee1.setAroma(Aroma.FLORAL);
        coffee1.setAcidity(Acidity.LOW);
        coffee1.setMix(Mix.ARABICA);
        coffee1.setOrigin("BRAZIL");
        coffee1.setDescription("A smooth Brazilian coffee.");

        coffee2 = new Coffee();
        coffee2.setId(2L);
        coffee2.setName("Espresso Blend");
        coffee2.setRoast(Roast.DARK);
        coffee2.setFlavour(Flavour.CHOCOLATE);
        coffee2.setAroma(Aroma.FLORAL);
        coffee2.setAcidity(Acidity.HIGH);
        coffee2.setMix(Mix.ROBUSTA);
        coffee2.setOrigin("COLOMBIA");
        coffee2.setDescription("Strong espresso blend.");
    }

    @Test
    void getCoffeesFiltered_shouldReturnFilteredCoffees_byRoastAndOrigin() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("name").ascending());
        Page<Coffee> page = new PageImpl<>(List.of(coffee1), pageable, 1);

        when(coffeeRepository.findAll(any(Specification.class), eq(pageable))).thenReturn(page);

        Page<Coffee> result = coffeeService.getCoffeesFiltered("MEDIUM", null, null, null, null, "BRAZIL", null, pageable);

        assertThat(result).isNotEmpty();
        assertThat(result.getContent()).allSatisfy(coffee ->
                assertThat(coffee.getRoast().toString()).isEqualTo("MEDIUM")
        );
        verify(coffeeRepository, times(1)).findAll(any(Specification.class), eq(pageable));
    }

    @Test
    void getCoffeesFiltered_shouldReturnAllCoffees_whenNoFilters() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Coffee> page = new PageImpl<>(List.of(coffee1, coffee2), pageable, 2);

        when(coffeeRepository.findAll(any(Specification.class), eq(pageable))).thenReturn(page);

        Page<Coffee> result = coffeeService.getCoffeesFiltered(null, null, null, null, null, null, null, pageable);

        assertThat(result.getContent()).containsExactly(coffee1, coffee2);
        verify(coffeeRepository, times(1)).findAll(any(Specification.class), eq(pageable));
    }

    @Test
    void getCoffeesFiltered_shouldReturnCoffeesBySearch() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Coffee> page = new PageImpl<>(List.of(coffee1), pageable, 1);

        when(coffeeRepository.findAll(any(Specification.class), eq(pageable))).thenReturn(page);

        Page<Coffee> result = coffeeService.getCoffeesFiltered(null, null, null, null, null, null, "brazil", pageable);

        assertThat(result.getContent()).containsExactly(coffee1);
        verify(coffeeRepository).findAll(any(Specification.class), eq(pageable));
    }
}