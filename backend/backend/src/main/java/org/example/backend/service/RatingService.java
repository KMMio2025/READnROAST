package org.example.backend.service;

import org.example.backend.entity.Review;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    public Review addReview(Review review) {
        return null;
    }

    public Review updateReview(int id, Review review) {
        return null;
    }

    public void deleteReview(int id) {
    }

    public List<Review> getReviewsForItem(int itemId) {
        return null;
    }

    public double calculateAverageRating(int itemId) {
        return 0.0;
    }
}