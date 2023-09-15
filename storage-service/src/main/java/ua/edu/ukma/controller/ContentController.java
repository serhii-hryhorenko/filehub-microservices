package ua.edu.ukma.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ua.edu.ukma.service.content.ContentService;
import ua.edu.ukma.service.content.dto.ContentDto;
import ua.edu.ukma.service.content.dto.GetContentRequest;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class ContentController {
    private final ContentService contentService;

    @PostMapping
    public ResponseEntity<?> content(@RequestBody GetContentRequest request) {
        Optional<ContentDto> content = contentService.getContent(request);

        if (content.isPresent()) {
            return ResponseEntity.ok(content.get());
        }

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No content found");
    }
}
