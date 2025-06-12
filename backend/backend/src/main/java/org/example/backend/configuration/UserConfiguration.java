package org.example.backend.configuration;

import lombok.RequiredArgsConstructor;
import org.example.backend.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; // Re-add this
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer; // For csrf disable
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService; // Use Spring Security's UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; // For addFilterBefore
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource; // For CorsConfigurationSource implementation

import java.util.ArrayList;
import java.util.Arrays; // Changed to Arrays.asList for clarity/consistency
import java.util.List;

@Configuration
@EnableWebSecurity // <--- IMPORTANT: Re-added this annotation
@RequiredArgsConstructor
public class UserConfiguration {

        private final UserRepository userRepository;

        // Note: You need to inject JwtAuthenticationFilter here.
        // It was missing in your provided code for the securityFilterChain method.
        // private final JwtAuthenticationFilter jwtAuthenticationFilter; // Uncomment
        // this if you prefer field injection

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http, // Renamed to securityFilterChain for
                                                                          // consistency
                        JwtAuthenticationFilter jwtAuthenticationFilter) // Injected here
                        throws Exception {
                http
                                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // <--- FIXED:
                                                                                                   // Correct way to
                                                                                                   // configure CORS
                                .csrf(AbstractHttpConfigurer::disable) // <--- IMPROVED: Using method reference for
                                                                       // disabling CSRF
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(
                                                                "/api/auth/login",
                                                                "/api/auth/register",
                                                                "/api/products/**",
                                                                // Include Swagger/OpenAPI paths if you use them:
                                                                "/v3/api-docs/**",
                                                                "/swagger-ui/**",
                                                                "/swagger-resources/**",
                                                                "/webjars/**")
                                                .permitAll()
                                                .requestMatchers("/api/auth/logout", "/api/auth/me", "/api/cart/**",
                                                                "/api/wishlist/**")
                                                .authenticated()
                                                .anyRequest().authenticated())
                                .authenticationProvider(authenticationProvider()) // Use the bean defined below
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public AuthenticationProvider authenticationProvider() {
                DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
                // Direct call to the userDetailsService bean
                authenticationProvider.setUserDetailsService(userDetailsService());
                authenticationProvider.setPasswordEncoder(passwordEncoder());
                return authenticationProvider;
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
                return config.getAuthenticationManager();
        }

        @Bean
        public UserDetailsService userDetailsService() { // <--- SIMPLIFIED: Removed UserRepository parameter, rely on
                                                         // injected bean
                return username -> userRepository.findByEmail(username)
                                .map(user -> new org.springframework.security.core.userdetails.User(
                                                user.getEmail(),
                                                user.getPassword(),
                                                new ArrayList<>())) // Assuming your User entity doesn't have roles
                                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(Arrays.asList( // Using Arrays.asList for multiple origins
                                "http://localhost:5173", // Don't forget localhost for dev
                                "https://readnroast.vercel.app", // Removed trailing slash for consistency
                                "https://readnroast-git-demo-kvlaskarolines-projects.vercel.app" // Add this if it's
                                                                                                 // your current
                                                                                                 // deployed frontend
                ));
                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                configuration.setAllowedHeaders(List.of("*")); // Allow all headers, including Authorization
                configuration.setAllowCredentials(true); // Important for sending cookies/auth headers
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}