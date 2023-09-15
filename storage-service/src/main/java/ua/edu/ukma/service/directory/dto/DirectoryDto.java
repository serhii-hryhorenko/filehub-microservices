package ua.edu.ukma.service.directory.dto;

import lombok.Data;
import org.springframework.lang.Nullable;

@Data
public class DirectoryDto {
    private final String type = "folder";

    private final long id;
    private final String name;
    private final Long parentId;

    public DirectoryDto(long id, @Nullable String name, Long parentId) {
        this.id = id;
        this.name = name;
        this.parentId = parentId;
    }
}