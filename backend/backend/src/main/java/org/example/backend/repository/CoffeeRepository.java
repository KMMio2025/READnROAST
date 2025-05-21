package org.example.backend.repository;

import org.example.backend.entity.Coffee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CoffeeRepository extends JpaRepository<Coffee, Long>, JpaSpecificationExecutor<Coffee> {
}