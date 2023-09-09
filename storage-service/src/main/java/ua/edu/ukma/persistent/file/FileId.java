package ua.edu.ukma.persistent.file;

import com.ukma.fileHub.persistent.PrimaryKey;
import com.ukma.fileHub.persistent.directory.DirectoryId;
import com.ukma.fileHub.persistent.registration.UserId;

import javax.annotation.Nonnull;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Date;

@Embeddable
public class FileId implements PrimaryKey, Serializable {
    private DirectoryId parentId;
    private UserId owner;
    private long hashedName;

    public FileId(@Nonnull DirectoryId parentId, @Nonnull UserId owner, @Nonnull String name) {
        this.parentId = parentId;
        this.owner = owner;
        this.hashedName = name.hashCode() + new Date().getTime();
    }

    public FileId() {

    }

    public DirectoryId parentId() {
        return parentId;
    }

    public long hashedName() {
        return hashedName;
    }

    public UserId owner() {
        return owner;
    }

    @Override
    public String name() {
        return "file_id";
    }

    @Override
    public String value() {
        return "null";
    }
}
