package ua.edu.ukma.service;

import lombok.Data;

@Data
public class RegisterUserRequest {
    private final String email;
    private final String firstName;
    private final String lastName;
    private final String password;
}
