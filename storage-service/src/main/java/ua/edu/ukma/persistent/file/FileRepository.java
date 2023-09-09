package ua.edu.ukma.persistent.file;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Parametrized interface for providing access to {@link File}.
 */
@Repository("fileRepository")
public interface FileRepository extends JpaRepository<File, FileId> {
    File findFileRecordById(FileId id);
}
