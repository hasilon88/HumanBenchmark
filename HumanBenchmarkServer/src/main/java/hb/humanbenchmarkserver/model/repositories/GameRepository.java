package hb.humanbenchmarkserver.model.repositories;

import hb.humanbenchmarkserver.model.entities.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Raphael Paquin
 * @version 01
 * Provides data-access to games.
 * 2024-04-17
 * HumanBenchmarkServer
 */
@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
}
