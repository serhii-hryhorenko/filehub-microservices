package ua.edu.ukma.persistent.directory;

import com.ukma.fileHub.persistent.PrimaryKey;
import com.ukma.fileHub.persistent.registration.UserId;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class DirectoryId implements PrimaryKey, Serializable {
    private static final DirectoryId rootDirectory = new DirectoryId(null, "root");

    private UserId owner;
    private String name;

    public DirectoryId(UserId owner, String name) {
        this.owner = owner;
        this.name = name;
    }

    public DirectoryId() {

    }

    @Override
    public String name() {
        return "directory_id";
    }

    @Override
    public String value() {
        return "null";
    }
}
