package ua.edu.ukma.persistent.directory;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ua.edu.ukma.common.model.user.UserId;

import java.io.Serializable;

@Embeddable
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DirectoryId implements Serializable {
    private Long id;
}
