package org.example.backend.entity;

public enum Code {
    SUCCESS("Operation end success"),
    ERROR("Operation end with error");

    public final String label;

    private Code(String label) {
        this.label = label;
    }
}
