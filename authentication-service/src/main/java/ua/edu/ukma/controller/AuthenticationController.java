package ua.edu.ukma.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ua.edu.ukma.common.model.UserCredentials;
import ua.edu.ukma.service.AuthenticationService;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody UserCredentials credentials) {
        if (authenticationService.validateCredentials(credentials)) {
            return ResponseEntity.ok(authenticationService.issueToken(credentials));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid credentials");
    }
}
