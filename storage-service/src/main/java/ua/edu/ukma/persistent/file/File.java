package ua.edu.ukma.persistent.file;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    @Column(name = "extension")
    private String extension;
}
