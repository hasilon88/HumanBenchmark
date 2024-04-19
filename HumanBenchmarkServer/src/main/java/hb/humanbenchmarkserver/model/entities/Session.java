package hb.humanbenchmarkserver.model.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;
import java.util.Collection;

/**
 * @author Raphael Paquin
 * @version 01
 * The session entity.
 * 2024-04-17
 * HumanBenchmarkServer
 */
@Data
@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Session implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sessionCode;
    @OneToMany
    private Collection<Device> players;
    private Boolean gameCompleted;
}
