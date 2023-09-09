package ua.edu.ukma.persistent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.edu.ukma.common.model.UserId;

import java.util.Optional;

/**
 * Parametrized interface for providing access to {@link User}.
 */
@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, UserId> {
}