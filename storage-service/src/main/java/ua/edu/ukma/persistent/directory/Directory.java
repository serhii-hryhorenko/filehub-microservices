package ua.edu.ukma.persistent.directory;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ua.edu.ukma.common.model.user.UserId;

import java.util.Objects;

import static java.util.Objects.isNull;

@Entity
@Table(name = "directory")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Directory {
    @EmbeddedId
    private DirectoryId id;

    @Column(name = "name")
    private String name;
    @Column(name = "parent")
    private DirectoryId parentId;
    @Column(name = "ownerId")
    private UserId owner;

    public boolean isRoot() {
        return isNull(name) && isNull(parentId) && isNull(owner);
    }
}
