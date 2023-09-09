package ua.edu.ukma.persistent.file;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Parametrized interface for providing access to {@link FileRecord}.
 */
@Repository("fileRepository")
public interface FileRepository extends JpaRepository<FileRecord, FileId> {
    FileRecord findFileRecordById(FileId id);
}
