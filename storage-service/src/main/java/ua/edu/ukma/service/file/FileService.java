package ua.edu.ukma.service.file;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ua.edu.ukma.common.dto.FileDto;
import ua.edu.ukma.persistent.directory.DirectoryRepository;
import ua.edu.ukma.persistent.file.File;
import ua.edu.ukma.persistent.file.FileId;
import ua.edu.ukma.persistent.file.FileRepository;
import ua.edu.ukma.persistent.file.FileStorageManager;
import ua.edu.ukma.service.directory.DirectoryService;
import ua.edu.ukma.service.directory.dto.DirectoryDto;
import ua.edu.ukma.service.directory.dto.GetDirectoryRequest;
import ua.edu.ukma.service.file.dto.DeleteFileRequest;
import ua.edu.ukma.service.file.dto.DownloadFileRequest;
import ua.edu.ukma.service.file.dto.UploadFileRequest;

import java.io.InputStream;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FileService {
    private static final Logger logger = LoggerFactory.getLogger(FileService.class);
    private final FileRepository fileRepository;
    private final FileStorageManager fileStorageManager;
    private final DirectoryRepository directoryRepository;
    private final DirectoryService directoryService;

    public Optional<FileDto> uploadFile(UploadFileRequest request) {
        Optional<DirectoryDto> directory = directoryService
                .getDirectory(new GetDirectoryRequest(request.directory(), request.ownerId()));

        if (directory.isEmpty()) {
            return Optional.empty();
        }

        long id = request.name().hashCode() + System.currentTimeMillis();

        FileId fileId = new FileId(id);
        File file = File.builder()
                .id(fileId)
                .ownerId(request.ownerId())
                .directoryId(request.directory())
                .name(request.name())
                .size(request.size())
                .mimetype(request.mimetype())
                .build();

       fileRepository.save(file);

        fileStorageManager.save(fileId, request.content());

        return Optional.of(
            new FileDto(id, request.name(), request.directory().getId(), request.size(), request.mimetype())
        );
    }

    public Optional<InputStream> downloadFile(DownloadFileRequest request) {
        Optional<File> file = fileRepository.findById(request.fileId());

        if (file.isEmpty()) {
            logger.info("No file found with id {}", request.fileId());
            return Optional.empty();
        }

        if (!file.get().getOwnerId().equals(request.ownerId())) {
            logger.warn("User {} tried to access file {} he don't own", request.ownerId(), request.fileId());
            return Optional.empty();
        }

        return Optional.ofNullable(fileStorageManager.get(request.fileId()));
    }

    public boolean deleteFile(DeleteFileRequest request) {
        Optional<File> file = fileRepository.findById(request.fileId());

        if (file.isEmpty()) {
            logger.info("No file found with id {}", request.fileId());
            return false;
        }

        if (!file.get().getOwnerId().equals(request.ownerId())) {
            logger.warn("User {} tried to delete file {} he don't own", request.ownerId(), request.fileId());
            return false;
        }

        fileRepository.deleteById(request.fileId());
        fileStorageManager.delete(request.fileId());

        return true;
    }
}
