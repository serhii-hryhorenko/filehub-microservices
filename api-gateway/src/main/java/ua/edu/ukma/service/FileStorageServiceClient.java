package ua.edu.ukma.service;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import ua.edu.ukma.common.dto.FileDto;
import ua.edu.ukma.service.content.dto.ContentDto;
import ua.edu.ukma.service.content.dto.GetContentRequest;
import ua.edu.ukma.service.file.dto.DeleteFileRequest;
import ua.edu.ukma.service.file.dto.UploadFileRequest;

public class FileStorageServiceClient {
    private final Gson gson = new Gson();
    private final WebClient webClient;

    public FileStorageServiceClient(@Value("storage.service.url") String storageServiceUrl) {
        this.webClient = WebClient.builder()
                .baseUrl(storageServiceUrl)
                .build();
    }

    public ContentDto getContent(GetContentRequest request) {
        return webClient.post()
                .body(BodyInserters.fromValue(gson.toJson(request)))
                .retrieve()
                .bodyToMono(ContentDto.class)
                .block();
    }

    public FileDto uploadFile(UploadFileRequest request) {
        return webClient.post()
                .body(BodyInserters.fromValue(gson.toJson(request)))
                .retrieve()
                .bodyToMono(FileDto.class)
                .block();
    }

    public boolean deleteFile(DeleteFileRequest request) {
        return Boolean.TRUE.equals(webClient.post()
                .body(BodyInserters.fromValue(gson.toJson(request)))
                .retrieve()
                .bodyToMono(Boolean.class)
                .block());
    }
}
