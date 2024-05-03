package hb.humanbenchmarkserver.model.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;
import java.util.Collection;
import java.util.Set;

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
public class Lobby implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String sessionCode;
    @OneToMany(fetch = FetchType.EAGER)
    private Set<Device> players;
    private Boolean gameCompleted;
    private Boolean isStarted;
}
