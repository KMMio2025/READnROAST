package org.example.backend.service.impl;

import org.example.backend.dtos.CoffeeListDTO;
import org.example.backend.entity.Coffee;
import org.example.backend.enums.*;
import org.example.backend.repository.CoffeeRepository;
import org.example.backend.service.CoffeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.data.domain.*;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class CoffeeServiceTest {

    @Mock
    private CoffeeRepository coffeeRepository;

    @InjectMocks
    private CoffeeService coffeeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    private Coffee createSampleCoffee() {
        Coffee coffee = new Coffee();
        coffee.setId(1L);
        coffee.setName("Colombia Supremo");
        coffee.setOrigin("Colombia");
        coffee.setRoast(Roast.MEDIUM);
        coffee.setFlavour(Flavour.CHOCOLATE);
        coffee.setAroma(Aroma.SWEET);
        coffee.setAcidity(Acidity.MEDIUM);
        coffee.setMix(Mix.ARABICA);
        coffee.setSizes(List.of(250, 500));
        coffee.setPrices(List.of(22.5, 39.99));
        return coffee;
    }

    @Test
    void getCoffeeList_shouldReturnMappedList() {
        Coffee coffee = createSampleCoffee();
        Page<Coffee> coffeePage = new PageImpl<>(List.of(coffee));
        Pageable pageable = PageRequest.of(0, 10);

        when(coffeeRepository.findAll(pageable)).thenReturn(coffeePage);

        Page<CoffeeListDTO> result = coffeeService.getCoffeeList(pageable);

        assertThat(result).isNotEmpty();
        CoffeeListDTO dto = result.getContent().get(0);
        assertThat(dto.getName()).isEqualTo(coffee.getName());
        assertThat(dto.getRoast()).isEqualTo(coffee.getRoast().toString());
        verify(coffeeRepository, times(1)).findAll(pageable);
    }
}