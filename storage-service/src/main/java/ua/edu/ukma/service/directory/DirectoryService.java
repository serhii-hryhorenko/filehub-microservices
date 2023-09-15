package ua.edu.ukma.service.directory;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ua.edu.ukma.persistent.directory.Directory;
import ua.edu.ukma.persistent.directory.DirectoryId;
import ua.edu.ukma.persistent.directory.DirectoryRepository;
import ua.edu.ukma.service.directory.dto.CreateSubdirectoryRequest;
import ua.edu.ukma.service.directory.dto.DeleteDirectoryRequest;
import ua.edu.ukma.service.directory.dto.DirectoryDto;
import ua.edu.ukma.service.directory.dto.GetDirectoryRequest;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DirectoryService {
    private static final Logger logger = LoggerFactory.getLogger(DirectoryService.class);

    private final DirectoryRepository directoryRepository;

    public Optional<DirectoryDto> getDirectory(GetDirectoryRequest request) {
        return directoryRepository.findByIdAndOwner(request.directoryId(), request.ownerId())
                .map(directory -> new DirectoryDto(
                        directory.getId().getId(),
                        directory.getName(),
                        directory.getParentId().getId())
                );
    }

    public boolean deleteDirectory(DeleteDirectoryRequest request) {
        Optional<Directory> toDelete = directoryRepository.findByIdAndOwner(request.toDelete(), request.ownerId());

        if (toDelete.isPresent()) {
            directoryRepository.delete(toDelete.get());
            return true;
        }

        return false;
    }

    public Optional<DirectoryDto> createSubdirectory(CreateSubdirectoryRequest request) {
        Optional<Directory> parentDirectory = directoryRepository.findById(request.parentId());

        if (parentDirectory.isEmpty()) {
            logger.info("No parent directory {} found for a new subdirectory", request.parentId());
            return Optional.empty();
        }

        if (!parentDirectory.get().getOwner().equals(request.owner())) {
            logger.info("User {} tried to create subdirectory in directory he doesn't own", request.owner());
            return Optional.empty();
        }

        long id = request.name().hashCode() + System.currentTimeMillis();
        Directory directory = Directory.builder()
                .id(DirectoryId.builder().id(id).build())
                .name(request.name())
                .parentId(request.parentId())
                .owner(request.owner())
                .build();

        directoryRepository.save(directory);

        return Optional.of(new DirectoryDto(id, request.name(), request.parentId().getId()));
    }
}
