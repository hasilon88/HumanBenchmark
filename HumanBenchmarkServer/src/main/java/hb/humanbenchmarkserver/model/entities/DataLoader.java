package hb.humanbenchmarkserver.model.entities;

import hb.humanbenchmarkserver.model.enums.GAME_TYPE;
import hb.humanbenchmarkserver.model.repositories.GameRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * @author Raphael Paquin
 * @version 01
 * This class is resonsible for loading data upon app start.
 * 2024-04-22
 * HumanBenchmarkServer
 */
@Component
@RequiredArgsConstructor
public class DataLoader {

    private final GameRepository gameRepository;

    @PostConstruct
    public void loadData() {

        if (gameRepository.count() == 0) {


            gameRepository.save(Game
                    .builder()
                    .gameName("Chimp Test")
                    .gameDescription("Click the squares in order according to their numbers. The test will get progressively harder.")
                    .gameType(GAME_TYPE.CHIMP_GAME)
                    .build()
            );

            gameRepository.save(Game
                    .builder()
                    .gameName("Number Memory")
                    .gameDescription("Remember the longest number you can. Numbers are shown for a short time.")
                    .gameType(GAME_TYPE.DIGIT_MEMORY_GAME)
                    .build()
            );

            gameRepository.save(Game
                    .builder()
                    .gameName("Verbal Memory")
                    .gameDescription("You will be shown words, one at a time.\nIf you've seen a word during the test, click SEEN.\n If it's a new word, click NEW")
                    .gameType(GAME_TYPE.VERBAL_MEMORY_GAME)
                    .build()
            );

            gameRepository.save(Game
                    .builder()
                    .gameName("Visual Memory")
                    .gameDescription("Remember an increasingly large board of squares.")
                    .gameType(GAME_TYPE.VISUAL_MEMORY_GAME)
                    .build()
            );
        }

    }
}
