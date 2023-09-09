package ua.edu.ukma.persistent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Parametrized interface for providing access to {@link UserRecord}.
 */
@Repository("userRepository")
public interface UserRepository extends JpaRepository<UserRecord, UserId> {
    Optional<UserRecord> findById(UserId id);
}