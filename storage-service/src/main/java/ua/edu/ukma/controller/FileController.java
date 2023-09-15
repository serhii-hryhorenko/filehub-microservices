package ua.edu.ukma.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.edu.ukma.common.dto.FileDto;
import ua.edu.ukma.service.file.FileService;
import ua.edu.ukma.service.file.dto.DeleteFileRequest;
import ua.edu.ukma.service.file.dto.DownloadFileRequest;
import ua.edu.ukma.service.file.dto.UploadFileRequest;

import java.io.InputStream;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestBody UploadFileRequest request) {
        Optional<FileDto> uploadedFile = fileService.uploadFile(request);

        if (uploadedFile.isPresent()) {
            return ResponseEntity.ok(uploadedFile.get());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to upload file.");
        }
    }

    @PostMapping("/download")
    public ResponseEntity<?> downloadFile(@RequestBody DownloadFileRequest request) {
        Optional<InputStream> fileContent = fileService.downloadFile(request);

        if (fileContent.isPresent()) {
            return ResponseEntity.ok().body(fileContent.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found or unauthorized access.");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFile(@RequestBody DeleteFileRequest request) {
        boolean deleted = fileService.deleteFile(request);

        if (deleted) {
            return ResponseEntity.ok("File deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found or unauthorized access.");
        }
    }
}
