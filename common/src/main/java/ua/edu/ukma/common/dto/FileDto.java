package ua.edu.ukma.common.dto;

import com.google.common.base.Preconditions;
import lombok.Builder;
import lombok.Getter;

import javax.annotation.ParametersAreNonnullByDefault;

@Builder
@Getter
public class FileDto {
    private final String type = "file";
    private final long id;
    private final String name;
    private final long parentId;
    private final long size;
    private final String mimetype;

    @ParametersAreNonnullByDefault
    public FileDto(long id, String name, long parentId, long size, String mimetype) {
        this.id = id;
        this.name = Preconditions.checkNotNull(name);
        this.parentId = parentId;
        this.size = size;
        this.mimetype = Preconditions.checkNotNull(mimetype);
    }
}