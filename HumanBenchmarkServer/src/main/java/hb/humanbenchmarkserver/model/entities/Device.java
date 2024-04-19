package hb.humanbenchmarkserver.model.entities;

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
 * Represents a participating device entity.
 * 2024-04-17
 * HumanBenchmarkServer
 */
@Data
@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Device implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userName;
    private Boolean donePlaying;
    private int score;
}
