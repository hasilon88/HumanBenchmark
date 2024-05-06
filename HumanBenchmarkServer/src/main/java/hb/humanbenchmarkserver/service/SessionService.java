package hb.humanbenchmarkserver.service;

import hb.humanbenchmarkserver.model.entities.Device;
import hb.humanbenchmarkserver.model.entities.Lobby;
import hb.humanbenchmarkserver.model.repositories.DeviceRepository;
import hb.humanbenchmarkserver.model.repositories.SessionRepository;
import hb.humanbenchmarkserver.payload.dto.CreateSessionDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class SessionService {
    private final DeviceRepository deviceRepository;
    private final SessionRepository sessionRepository;

    public String createSession(CreateSessionDTO createSessionDTO) {
        Device player = deviceRepository.save(
                Device
                    .builder()
                        .userName(createSessionDTO.getDeviceName())
                        .donePlaying(false)
                        .score(0)
                    .build()
        );

        StringBuilder sessionCode = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            sessionCode.append(Math.random() * 6);
        }

        Lobby session = sessionRepository.save(
          Lobby
                  .builder()
                  .sessionCode(String.valueOf(sessionCode))
                  .gameCompleted(false)
                  .players(new HashSet<>(List.of(player)))
                  .build()
        );

        return session.getSessionCode();
    }

    public Boolean lobbyExists(String sessionCode) {
        return sessionRepository.existsBySessionCode(sessionCode);
    }

    public String generateSessionCode() {
        StringBuilder code = new StringBuilder();

        while (code.length() < 6) {
            code.append((int) (Math.random() * 9));
            if (code.length() == 6) {
                if (lobbyExists(String.valueOf(code))) {
                    code = new StringBuilder();
                }
            }
        }

        return code.toString();
    }

    public Lobby getSessionByCodeOrDefault(String code) {

        try {
            Optional<Lobby> sessionOptional = sessionRepository.getSessionBySessionCode(code);
            return sessionOptional.orElse(null);
        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }

    public Lobby save(Lobby lobby) {
        return sessionRepository.save(lobby);
    }

    public void deleteSession(Lobby lobby) {
        Optional<Lobby> lobbyOptional = sessionRepository.getSessionBySessionCode(lobby.getSessionCode());
        lobbyOptional.ifPresent(sessionRepository::delete);
    }
}
