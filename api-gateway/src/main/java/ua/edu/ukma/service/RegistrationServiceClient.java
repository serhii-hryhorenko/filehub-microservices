package ua.edu.ukma.service;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class RegistrationServiceClient {
    private final Gson gson = new Gson();
    private final WebClient webClient;

    public RegistrationServiceClient(@Value("registration.service.url") String registrationServiceUrl) {
        this.webClient = WebClient.builder()
                .baseUrl(registrationServiceUrl)
                .build();
    }

    public boolean register(RegisterUserRequest request) {
        return webClient.post()
                .body(BodyInserters.fromValue(gson.toJson(request)))
                .retrieve()
                .toBodilessEntity()
                .block()
                .getStatusCode()
                .is2xxSuccessful();
    }
}
