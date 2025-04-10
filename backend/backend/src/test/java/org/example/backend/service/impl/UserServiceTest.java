package org.example.backend.service.impl;

import org.example.backend.entity.User;
import org.example.backend.repository.UserRepository;
import org.example.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void createUser_shouldReturnCreatedUser_whenValidDataProvided() {
        User user = new User();
        user.setName("John Doe");
        user.setEmail("john@example.com");
        user.setPassword("password123");

        when(userRepository.save(user)).thenReturn(user);

        User createdUser = userService.createUser(user);

        assertThat(createdUser).isNotNull();
        assertThat(createdUser.getName()).isEqualTo("John Doe");
        assertThat(createdUser.getEmail()).isEqualTo("john@example.com");

        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void getUserById_shouldReturnUser_whenUserExists() {
        User user = new User();
        user.setId(1);
        user.setName("John Doe");
        user.setEmail("john@example.com");

        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        Optional<User> retrievedUser = userService.getUserById(1);

        assertThat(retrievedUser).isPresent();
        assertThat(retrievedUser.get().getName()).isEqualTo("John Doe");
        assertThat(retrievedUser.get().getEmail()).isEqualTo("john@example.com");

        verify(userRepository, times(1)).findById(1);
    }

    @Test
    public void updateUser_shouldReturnUpdatedUser_whenValidDataProvided() {
        User existingUser = new User();
        existingUser.setId(1);
        existingUser.setName("John Doe");
        existingUser.setEmail("john@example.com");

        User updatedUser = new User();
        updatedUser.setName("Updated Name");
        updatedUser.setEmail("updated@example.com");

        when(userRepository.findById(1)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(existingUser)).thenReturn(existingUser);

        User result = userService.updateUser(1, updatedUser);

        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Updated Name");
        assertThat(result.getEmail()).isEqualTo("updated@example.com");

        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).save(existingUser);
    }

    @Test
    public void deleteUser_shouldCallRepositoryDelete_whenUserExists() {
        User user = new User();
        user.setId(1);
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        userService.deleteUser(1);

        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).delete(user);
    }
}