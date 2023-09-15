package ua.edu.ukma.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.edu.ukma.common.dto.FileDto;
import ua.edu.ukma.common.model.UserCredentials;
import ua.edu.ukma.service.AuthenticationServiceClient;
import ua.edu.ukma.service.FileStorageServiceClient;
import ua.edu.ukma.service.RegisterUserRequest;
import ua.edu.ukma.service.RegistrationServiceClient;
import ua.edu.ukma.service.content.dto.ContentDto;
import ua.edu.ukma.service.content.dto.GetContentRequest;
import ua.edu.ukma.service.file.dto.DeleteFileRequest;
import ua.edu.ukma.service.file.dto.UploadFileRequest;

import java.util.Optional;
import java.util.function.BooleanSupplier;
import java.util.function.Function;
import java.util.function.Supplier;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiGatewayController {
    private final AuthenticationServiceClient authenticationClient;
    private final RegistrationServiceClient registrationServiceClient;
    private final FileStorageServiceClient fileStorageServiceClient;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserCredentials credentials) {
        Optional<String> token = authenticationClient.authenticate(credentials);

        return token.map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid credentials"));
    }

    @PostMapping("/logout")
    public HttpStatus logout(@RequestBody UserCredentials credentials) {
        boolean loggedOut = authenticationClient.logout(credentials);

        return loggedOut
                ? HttpStatus.OK
                : HttpStatus.FORBIDDEN;
    }

    @PostMapping("/register")
    public HttpStatus register(@RequestBody RegisterUserRequest request) {
        return registrationServiceClient.register(request)
                ? HttpStatus.OK
                : HttpStatus.BAD_REQUEST;
    }

    @PostMapping("/content")
    public ResponseEntity<?> content(@RequestHeader("Authorization") String token,
                                     @RequestBody GetContentRequest request) {
        Optional<ContentDto> contentDto = getIfAuthenticated(token, () -> fileStorageServiceClient.getContent(request));

        if (contentDto.isPresent()) {
            return ResponseEntity.ok(contentDto);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid credentials");
    }

    @PostMapping("/file/upload")
    public ResponseEntity<?> uploadFile(@RequestHeader("Authorization") String token,
                                        @RequestBody UploadFileRequest request) {
        Optional<FileDto> fileDto = getIfAuthenticated(token, () -> fileStorageServiceClient.uploadFile(request));

        if (fileDto.isPresent()) {
            return ResponseEntity.ok(fileDto);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to upload the file");
    }

    @PostMapping("/file/delete")
    public HttpStatus deleteFile(@RequestHeader("Authorization") String token,
                                        @RequestBody DeleteFileRequest request) {
        boolean deleted = doIfAuthenticated(token, () -> fileStorageServiceClient.deleteFile(request));

        return deleted
            ? HttpStatus.OK
            : HttpStatus.BAD_REQUEST;
    }

    private <T> Optional<T> getIfAuthenticated(String token, Supplier<T> responseFactory) {
        if (authenticationClient.checkAuthentication(token)) {
            return Optional.of(responseFactory.get());
        }

        return Optional.empty();
    }

    private boolean doIfAuthenticated(String token, BooleanSupplier responseFactory) {
        if (authenticationClient.checkAuthentication(token)) {
            return responseFactory.getAsBoolean();
        }

        return false;
    }
}
