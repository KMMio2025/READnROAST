package org.example.backend.repository;

import org.example.backend.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishListRepository extends JpaRepository<WishList, Integer> {
    // Możesz dodać dodatkowe metody, jeśli będą potrzebne później
}