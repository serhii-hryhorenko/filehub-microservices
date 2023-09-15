package ua.edu.ukma.persistent.directory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.edu.ukma.common.model.user.UserId;

import java.util.List;
import java.util.Optional;

@Repository("directoryRepository")
public interface DirectoryRepository extends JpaRepository<Directory, DirectoryId> {
    List<Directory> findDirectoryRecordsByParentId(DirectoryId parentId);
    Optional<Directory> findByIdAndOwner(DirectoryId id, UserId owner);
    List<Directory> findAllByParentId(DirectoryId parentId);
    List<Directory> findAllByParentIdAndNameLikeIgnoreCase(DirectoryId parentId, String searchParam);
}
