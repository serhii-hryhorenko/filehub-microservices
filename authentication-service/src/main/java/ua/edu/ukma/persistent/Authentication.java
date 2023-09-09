package ua.edu.ukma.persistent;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ua.edu.ukma.common.model.UserId;

/**
 * Authorized user record representation from database.
 */
@Entity
@Table(name = "authentication")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Authentication {
    @EmbeddedId
    private UserId id;

    @Column(name = "token")
    private String authToken;

    @Override
    public String toString() {
        return "AuthorizedUser{" +
                "id=" + id +
                ", token='" + authToken + '\'' +
                '}';
    }
}
