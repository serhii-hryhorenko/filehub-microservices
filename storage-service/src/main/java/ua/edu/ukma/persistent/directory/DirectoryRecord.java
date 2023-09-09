package ua.edu.ukma.persistent.directory;

import com.ukma.fileHub.persistent.DatabaseRecord;

import javax.annotation.Nonnull;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "directories")
public class DirectoryRecord implements DatabaseRecord<DirectoryId> {

    @EmbeddedId
    private DirectoryId id;

    @Column(name = "parent_id", nullable = true)
    private DirectoryId parentId;

    public DirectoryRecord() {
    }

    public DirectoryRecord(@Nonnull DirectoryId id, @Nonnull DirectoryId parentId) {
        this.id = id;
        this.parentId = parentId;
    }

    @Override
    public DirectoryId key() {
        return null;
    }

    @Override
    public String fieldsTuple() {
        return null;
    }

    @Override
    public String valuesTuple() {
        return null;
    }

    @Override
    public String updateQueryFields() {
        return null;
    }

    public DirectoryId id() {
        return id;
    }

    public DirectoryId parentId() {
        return parentId;
    }
}
