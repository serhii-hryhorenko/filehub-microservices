package ua.edu.ukma.persistent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.edu.ukma.common.model.user.User;
import ua.edu.ukma.common.model.user.UserId;

/**
 * Parametrized interface for providing access to {@link User}.
 */
@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, UserId> {
}