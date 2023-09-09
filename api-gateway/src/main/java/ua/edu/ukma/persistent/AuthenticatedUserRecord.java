package ua.edu.ukma.persistent;

import com.ukma.fileHub.persistent.DatabaseRecord;
import com.ukma.fileHub.persistent.registration.UserId;

import javax.annotation.Nonnull;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Authorized user record representation from database.
 */
@Entity
@Table(name = "authenticated-users")
public class AuthenticatedUserRecord implements DatabaseRecord<UserId> {
    @EmbeddedId
    private UserId id;

    @Column(name = "auth_token")
    private String authToken;

    public AuthenticatedUserRecord() {
    }

    public AuthenticatedUserRecord(@Nonnull UserId id, @Nonnull String token) {
        this.id = id;
        this.authToken = token;
    }

    @Override
    public UserId key() {
        return id;
    }

    @Override
    public String fieldsTuple() {
        return "(user_id, auth_token)";
    }

    @Override
    public String valuesTuple() {
        return String.format("(%s, %s)", id.value(), authToken);
    }

    @Override
    public String updateQueryFields() {
        return "(user_id=?, auth_token=?)";
    }

    public String token() {
        return authToken;
    }

    @Override
    public String toString() {
        return "AuthorizedUser{" +
                "id=" + id +
                ", token='" + authToken + '\'' +
                '}';
    }
}
