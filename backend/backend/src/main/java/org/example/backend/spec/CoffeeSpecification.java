package org.example.backend.spec;

import org.example.backend.entity.Coffee;
import org.springframework.data.jpa.domain.Specification;

public class CoffeeSpecification {

    public static Specification<Coffee> hasRoast(String roast) {
        return (root, query, cb) -> cb.equal(root.get("roast").as(String.class), roast);
    }

    public static Specification<Coffee> hasFlavour(String flavour) {
        return (root, query, cb) -> cb.equal(root.get("flavour").as(String.class), flavour);
    }

    public static Specification<Coffee> hasAroma(String aroma) {
        return (root, query, cb) -> cb.equal(root.get("aroma").as(String.class), aroma);
    }

    public static Specification<Coffee> hasAcidity(String acidity) {
        return (root, query, cb) -> cb.equal(root.get("acidity").as(String.class), acidity);
    }

    public static Specification<Coffee> hasMix(String mix) {
        return (root, query, cb) -> cb.equal(root.get("mix").as(String.class), mix);
    }

    public static Specification<Coffee> hasOrigin(String origin) {
        return (root, query, cb) -> cb.equal(root.get("origin"), origin);
    }

    public static Specification<Coffee> hasSearch(String search) {
        return (root, query, cb) -> {
            String like = "%" + search.toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(root.get("name")), like),
                    cb.like(cb.lower(root.get("description")), like),
                    cb.like(cb.lower(root.get("origin")), like)
            );
        };
    }
}