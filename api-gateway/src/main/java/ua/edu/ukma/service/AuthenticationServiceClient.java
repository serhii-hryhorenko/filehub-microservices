package ua.edu.ukma.service;


import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import ua.edu.ukma.common.model.UserCredentials;

import java.util.Optional;

@Service
public class AuthenticationServiceClient {
    private final Gson gson = new Gson();
    private final WebClient webClient;

    public AuthenticationServiceClient(@Value("authentication.service.url") String authenticationServiceUrl) {
        this.webClient = WebClient.builder()
                .baseUrl(authenticationServiceUrl)
                .build();
    }

    public boolean checkAuthentication(String token) {
        return Boolean.TRUE.equals(webClient.post()
                .uri("/authenticated")
                .body(BodyInserters.fromValue(token))
                .retrieve()
                .bodyToMono(Boolean.class)
                .block());
    }

    public Optional<String> authenticate(UserCredentials credentials) {
        return webClient.post()
                .body(BodyInserters.fromValue(gson.toJson(credentials)))
                .retrieve()
                .bodyToMono(String.class)
                .map(Optional::ofNullable)
                .block();
    }

    public boolean logout(UserCredentials credentials) {
        return true;
    }
}
