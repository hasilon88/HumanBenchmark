package hb.humanbenchmarkserver.model.entities;

import hb.humanbenchmarkserver.model.enums.GAME_TYPE;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

/**
 * @author Raphael Paquin
 * @version 01
 * Game entity.
 * 2024-04-17
 * HumanBenchmarkServer
 */
@Entity
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Game implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String gameName;
    private String gameDescription;
    private GAME_TYPE gameType;
}
