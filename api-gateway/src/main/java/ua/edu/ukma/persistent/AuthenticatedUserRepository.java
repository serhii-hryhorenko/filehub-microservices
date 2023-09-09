package ua.edu.ukma.persistent;


import com.ukma.fileHub.persistent.registration.UserId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Parametrized interface for providing access to {@link AuthenticatedUserRecord}.
 */
@Repository("authenticatedUserRepository")
public interface AuthenticatedUserRepository extends JpaRepository<AuthenticatedUserRecord, UserId> {
    Optional<AuthenticatedUserRecord> findById(UserId id);
}
