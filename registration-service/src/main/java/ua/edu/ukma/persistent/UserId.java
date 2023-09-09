package ua.edu.ukma.persistent;

import com.google.common.base.Preconditions;
import com.ukma.fileHub.persistent.PrimaryKey;

import javax.annotation.Nonnull;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class UserId implements PrimaryKey, Serializable {

    private String email;

    public UserId(@Nonnull String email) {
        this.email = Preconditions.checkNotNull(email);
    }

    public UserId() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserId)) return false;

        UserId userId = (UserId) o;

        return email.equals(userId.email);
    }

    @Override
    public int hashCode() {
        return email.hashCode();
    }

    @Override
    public String name() {
        return "user_id";
    }

    @Override
    public String value() {
        return email;
    }

    public String email() {
        return email;
    }

    @Override
    public String toString() {
        return "UserId{" +
                "email='" + email + '\'' +
                '}';
    }
}