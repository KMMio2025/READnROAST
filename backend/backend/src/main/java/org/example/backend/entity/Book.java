package org.example.backend.entity;

import org.example.backend.enums.Genre;
import org.example.backend.enums.Language;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
public class Book extends Item {

    private String author;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    @Enumerated(EnumType.STRING)
    private Language language;

    private double price;

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
    }

    public void setTitle(String testBook) {
    }

    public String getTitle() {
        return null;
    }
}