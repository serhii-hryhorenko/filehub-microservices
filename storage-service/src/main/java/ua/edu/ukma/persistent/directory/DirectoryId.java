package ua.edu.ukma.persistent.directory;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ua.edu.ukma.common.model.UserId;

import java.io.Serializable;

@Embeddable
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DirectoryId implements Serializable {
    private static final DirectoryId rootDirectory = DirectoryId.builder().name("root").build();

    @Column(name = "owner")
    private UserId owner;
    @Column(name = "name")
    private String name;
}
