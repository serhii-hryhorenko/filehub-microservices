package ua.edu.ukma.service;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.edu.ukma.common.model.UserCredentials;
import ua.edu.ukma.persistent.UserRepository;

@Service
@AllArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean validateCredentials(UserCredentials credentials) {
        return userRepository.existsUserByEmailAndPasswordHash(
                credentials.getEmail(),
                passwordEncoder.encode(credentials.getPassword())
        );
    }

    public boolean validateToken(String jwtToken) {
        return true;
    }

    public String issueToken(UserCredentials credentials) {
        return "jwt";
    }
}
