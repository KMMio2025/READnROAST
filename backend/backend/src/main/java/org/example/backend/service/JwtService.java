package org.example.backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;

@Component
public class JwtService {

    private final String SECRET;
    private final int exp;
    private final Set<String> blacklistedTokens = new HashSet<>(); // Czarna lista tokenów

    public JwtService(@Value("${jwt.secret}") String secret, @Value("${jwt.exp}") int exp) {
        this.SECRET = secret;
        this.exp = exp;
    }

    public void validateToken(final String token) {
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }


    public void invalidateToken(String token) {
        blacklistedTokens.add(token); // Dodaj token do czarnej listy
    }

    public boolean isTokenValid(String token) {
        return !blacklistedTokens.contains(token) && // Sprawdź, czy token nie jest unieważniony
                Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token) != null;
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    public String createToken(Map<String, Object> claims, String username) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + exp))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
    }
}



