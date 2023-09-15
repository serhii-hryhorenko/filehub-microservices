package ua.edu.ukma.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ua.edu.ukma.service.directory.DirectoryService;
import ua.edu.ukma.service.directory.dto.CreateSubdirectoryRequest;
import ua.edu.ukma.service.directory.dto.DeleteDirectoryRequest;
import ua.edu.ukma.service.directory.dto.DirectoryDto;
import ua.edu.ukma.service.directory.dto.GetDirectoryRequest;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class DirectoryController {
    private final DirectoryService directoryService;

    @PostMapping("/directory")
    public ResponseEntity<?> getDirectory(@RequestBody GetDirectoryRequest request) {
        Optional<DirectoryDto> directory = directoryService.getDirectory(request);

        if (directory.isPresent()) {
            return ResponseEntity.ok(directory.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Directory not found or unauthorized access.");
        }
    }

    @PostMapping("/subdirectory")
    public ResponseEntity<?> createSubdirectory(@RequestBody CreateSubdirectoryRequest request) {
        Optional<DirectoryDto> createdDirectory = directoryService.createSubdirectory(request);

        if (createdDirectory.isPresent()) {
            return ResponseEntity.ok(createdDirectory.get());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create subdirectory.");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteDirectory(@RequestBody DeleteDirectoryRequest request) {
        boolean deleted = directoryService.deleteDirectory(request);

        if (deleted) {
            return ResponseEntity.ok("Directory deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Directory not found or unauthorized access.");
        }
    }
}
