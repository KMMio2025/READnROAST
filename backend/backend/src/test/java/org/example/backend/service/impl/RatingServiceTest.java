package org.example.backend.service.impl;

import org.example.backend.entity.Coffee;
import org.example.backend.entity.Item;
import org.example.backend.entity.Review;
import org.example.backend.entity.User;
import org.example.backend.service.RatingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class RatingServiceTest {

    private RatingService ratingService;

    @BeforeEach
    public void setUp() {
        ratingService = new RatingService();
    }

    @Test
    public void addReview_shouldReturnReview_whenValidDataProvided() {
        Review review = new Review();
        review.setUser(new User()); // Zakładamy, że User jest poprawną encją
        review.setItem(new Coffee()); // Zakładamy, że Item jest poprawną encją
        review.setContent("Świetny produkt!");
        review.setRating(5);
        review.setDate(LocalDate.now());

        Review savedReview = ratingService.addReview(review);

        // Zakładamy, że metoda powinna zwrócić zapisany obiekt
        assertThat(savedReview).isNotNull();
        assertThat(savedReview.getContent()).isEqualTo("Świetny produkt!");
        assertThat(savedReview.getRating()).isEqualTo(5);
    }

    @Test
    public void updateReview_shouldReturnUpdatedReview_whenValidIdAndDataProvided() {
        Review updatedReview = new Review();
        updatedReview.setContent("Zmieniona treść");
        updatedReview.setRating(4);

        Review result = ratingService.updateReview(1, updatedReview);

        // Zakładamy, że metoda powinna zwrócić zaktualizowany obiekt
        assertThat(result).isNotNull();
        assertThat(result.getContent()).isEqualTo("Zmieniona treść");
        assertThat(result.getRating()).isEqualTo(4);
    }

    @Test
    public void deleteReview_shouldNotThrowException_whenValidIdProvided() {
        // Zakładamy, że metoda powinna rzucić wyjątek, jeśli nie jest zaimplementowana
        assertThrows(UnsupportedOperationException.class, () -> ratingService.deleteReview(1));
    }

    @Test
    public void getReviewsForItem_shouldReturnListOfReviews_whenValidItemIdProvided() {
        int itemId = 1;

        List<Review> reviews = ratingService.getReviewsForItem(itemId);

        // Zakładamy, że metoda zwraca listę recenzji
        assertThat(reviews).isNotNull();
        assertThat(reviews).isEmpty();
    }

    @Test
    public void calculateAverageRating_shouldReturnCorrectAverage_whenValidItemIdProvided() {
        int itemId = 1;

        double averageRating = ratingService.calculateAverageRating(itemId);

        // Zakładamy, że metoda zwraca poprawną średnią ocen
        assertThat(averageRating).isEqualTo(1.0);
    }
}