package ua.edu.ukma.persistent;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.edu.ukma.common.model.user.UserId;

/**
 * Parametrized interface for providing access to {@link Authentication}.
 */
@Repository("authenticatedUserRepository")
public interface AuthenticationRepository extends JpaRepository<Authentication, UserId> {
}
