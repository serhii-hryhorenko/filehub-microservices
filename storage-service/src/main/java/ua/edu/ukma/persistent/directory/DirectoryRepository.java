package ua.edu.ukma.persistent.directory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("directoryRepository")
public interface DirectoryRepository extends JpaRepository<DirectoryRecord, DirectoryId> {
    List<DirectoryId> findDirectoryRecordsByParentId(DirectoryId parentId);

}
