package ua.edu.ukma.service.content;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.edu.ukma.common.dto.FileDto;
import ua.edu.ukma.persistent.directory.Directory;
import ua.edu.ukma.persistent.directory.DirectoryRepository;
import ua.edu.ukma.persistent.file.File;
import ua.edu.ukma.persistent.file.FileRepository;
import ua.edu.ukma.service.content.dto.ContentDto;
import ua.edu.ukma.service.content.dto.GetContentRequest;
import ua.edu.ukma.service.directory.dto.DirectoryDto;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContentService {
    private final FileRepository fileRepository;
    private final DirectoryRepository directoryRepository;

    public Optional<ContentDto> getContent(GetContentRequest request) {
        Optional<Directory> directory = directoryRepository.findByIdAndOwner(request.directoryId(), request.ownerId());
        if (directory.isEmpty()) {
            return Optional.empty();
        }

        if (request.searchParameter().isEmpty()) {
            List<DirectoryDto> directories = directoryRepository
                    .findAllByParentId(request.directoryId()).stream()
                    .map(this::mapToDirectoryDto)
                    .toList();

            List<FileDto> files = fileRepository
                    .findAllByDirectoryId(request.directoryId()).stream()
                    .map(this::mapToFileDto)
                    .toList();

            return Optional.of(new ContentDto(directories, files));
        }

        List<DirectoryDto> directories = directoryRepository
                .findAllByParentIdAndNameLikeIgnoreCase(request.directoryId(), request.searchParameter()).stream()
                .map(this::mapToDirectoryDto)
                .toList();

        List<FileDto> files = fileRepository.findAllByDirectoryIdAndNameIsLikeIgnoreCase(request.directoryId(), request.searchParameter()).stream()
                .map(this::mapToFileDto)
                .toList();

        return Optional.of(new ContentDto(directories, files));
    }

    private DirectoryDto mapToDirectoryDto(Directory directory) {
        return new DirectoryDto(directory.getId().getId(), directory.getName(), directory.getParentId().getId());
    }

    private FileDto mapToFileDto(File file) {
        return new FileDto(file.getId().getHashedName(), file.getName(), file.getDirectoryId().getId(), file.getSize(), file.getMimetype());
    }
}
