package ua.edu.ukma.persistent.file;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ua.edu.ukma.common.model.UserId;
import ua.edu.ukma.persistent.directory.DirectoryId;

import java.io.Serializable;

@Embeddable
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FileId implements Serializable {
    private DirectoryId parentId;
    private UserId owner;
    private long hashedName;

}
