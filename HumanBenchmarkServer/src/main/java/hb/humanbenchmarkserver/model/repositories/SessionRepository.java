package hb.humanbenchmarkserver.model.repositories;

import hb.humanbenchmarkserver.model.entities.Lobby;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Raphael Paquin
 * @version 01
 * Provides data-access to sessions.
 * 2024-04-17
 * HumanBenchmarkServer
 */
@Repository
public interface SessionRepository extends JpaRepository<Lobby, Long> {
    Optional<Lobby> getSessionBySessionCode(String sessionCode);
    Boolean existsBySessionCode(String sessionCode);
}
