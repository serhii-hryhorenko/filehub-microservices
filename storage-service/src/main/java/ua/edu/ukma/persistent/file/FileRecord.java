package ua.edu.ukma.persistent.file;

import com.ukma.fileHub.persistent.DatabaseRecord;

import javax.annotation.Nonnull;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "files")
public class FileRecord implements DatabaseRecord<FileId> {

    @EmbeddedId
    private FileId id;

    private String name;

    private String extension;

    public FileRecord() {
    }

    public FileRecord(@Nonnull FileId id) {
        this.id = id;
    }

    @Override
    public FileId key() {
        return id;
    }

    @Override
    public String fieldsTuple() {
        return "()";
    }

    @Override
    public String valuesTuple() {
        return "";
    }

    @Override
    public String updateQueryFields() {
        return "";
    }
}
