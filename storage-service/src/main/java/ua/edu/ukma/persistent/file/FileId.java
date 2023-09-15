package ua.edu.ukma.persistent.file;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FileId implements Serializable {
    private long hashedName;
}
