package ua.edu.ukma.persistent.file;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.edu.ukma.persistent.directory.DirectoryId;

import java.util.List;

/**
 * Parametrized interface for providing access to {@link File}.
 */
@Repository("fileRepository")
public interface FileRepository extends JpaRepository<File, FileId> {
    File findFileRecordById(FileId id);
    List<File> findAllByDirectoryId(DirectoryId directoryId);
    List<File> findAllByDirectoryIdAndNameIsLikeIgnoreCase(DirectoryId directoryId, String searchParam);
}
