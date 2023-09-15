package ua.edu.ukma.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import ua.edu.ukma.common.model.user.User;
import ua.edu.ukma.common.model.user.UserId;
import ua.edu.ukma.persistent.UserRepository;

@RequiredArgsConstructor
public class RegistrationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean register(RegisterUserRequest request) {
        UserId userId = new UserId(request.getEmail());

        if (userRepository.existsById(userId)) {
            return false;
        }

        User newUser = User.builder()
            .id(userId)
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .passwordHash(passwordEncoder.encode(request.getPassword()))
            .build();

        userRepository.save(newUser);

        return true;
    }
}
