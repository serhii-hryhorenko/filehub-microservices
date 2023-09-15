package ua.edu.ukma.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ua.edu.ukma.service.RegisterUserRequest;
import ua.edu.ukma.service.RegistrationService;

@RestController
@RequiredArgsConstructor
public class RegistrationController {
    private final RegistrationService registrationService;

    @PostMapping("/register")
    public HttpStatus register(@RequestBody RegisterUserRequest request) {
        return registrationService.register(request)
            ? HttpStatus.OK
            : HttpStatus.BAD_REQUEST;
    }
}
