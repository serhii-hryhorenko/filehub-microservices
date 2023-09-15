package ua.edu.ukma.persistent.file;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ua.edu.ukma.common.model.user.UserId;
import ua.edu.ukma.persistent.directory.DirectoryId;

@Entity
@Table(name = "file")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class File {

    @EmbeddedId
    private FileId id;
    @Column(name = "name")
    private String name;
    @Column(name = "directory")
    private DirectoryId directoryId;
    @Column(name = "ownerId")
    private UserId ownerId;
    @Column(name = "size")
    private long size;
    @Column(name = "mimetype")
    private String mimetype;
}
