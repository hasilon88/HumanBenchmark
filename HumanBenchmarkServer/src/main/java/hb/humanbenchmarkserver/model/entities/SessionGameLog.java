package hb.humanbenchmarkserver.model.entities;

import hb.humanbenchmarkserver.model.enums.GAME_TYPE;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;
import java.util.Map;

/**
 * @author Raph
 * HumanBenchmarkServer - hb.humanbenchmarkserver.model.entities
 * SessionGameLog
 * <p>This is the object that will be created and updtated every time a game a started for each player.<p>
 * 5/21/2024
 */
@Data
@Entity
@AllArgsConstructor
@Builder
@RequiredArgsConstructor
public class SessionGameLog implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Lobby lobby;
    @ManyToOne
    private Device user;
    @ElementCollection
    @CollectionTable(name = "game_statistics_map", joinColumns = @JoinColumn(name = "game_statistics_id"))
    @MapKeyEnumerated(EnumType.STRING)
    @MapKeyColumn(name = "game_type")
    @Column(name = "score")
    private Map<GAME_TYPE, Float> gameScores;
}
