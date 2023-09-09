package ua.edu.ukma.persistent.directory;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "directories")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Directory {

    @EmbeddedId
    private DirectoryId id;

    @Column(name = "parent_id", nullable = true)
    private DirectoryId parentId;
}
