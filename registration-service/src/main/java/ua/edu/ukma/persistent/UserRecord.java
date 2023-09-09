package ua.edu.ukma.persistent;

import com.ukma.fileHub.persistent.DatabaseRecord;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * User record representation from database.
 */
@Entity
@Table(name = "users")
public class UserRecord implements DatabaseRecord<UserId> {
    @EmbeddedId
    private UserId id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;


    @Column(name = "password_hash")
    private String passwordHash;

    public UserRecord(UserId id, String firstName, String lastName, String passwordHash) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.passwordHash = passwordHash;
    }

    public UserRecord() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserRecord)) return false;

        UserRecord that = (UserRecord) o;

        if (!id.equals(that.id)) return false;
        if (!firstName.equals(that.firstName)) return false;
        if (!lastName.equals(that.lastName)) return false;
        return passwordHash.equals(that.passwordHash);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public UserId key() {
        return id;
    }

    @Override
    public String fieldsTuple() {
        return "(email, first_name, last_name, password_hash)";
    }

    @Override
    public String valuesTuple() {
        return String.format("(%s, %s, %s, %s)", id.email(), firstName, lastName, passwordHash);
    }

    @Override
    public String updateQueryFields() {
        return String.format("(%s=?, %s=?, %s=?, %s=?)", id.email(), firstName, lastName, passwordHash);
    }

    public String firstName() {
        return firstName;
    }

    public String lastName() {
        return lastName;
    }

    public String passwordHash() {
        return passwordHash;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + id.email() + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", passwordHash=" + passwordHash +
                '}';
    }
}