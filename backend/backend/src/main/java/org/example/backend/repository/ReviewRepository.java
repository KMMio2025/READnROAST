package org.example.backend.repository;

import org.example.backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    // Pobierz wszystkie recenzje dla konkretnego przedmiotu
    List<Review> findByItemId(int itemId);

    // Pobierz średnią ocenę dla konkretnego przedmiotu
    List<Review> findByItemIdAndRatingGreaterThanEqual(int itemId, int rating);
}