package hb.humanbenchmarkserver.service;

import hb.humanbenchmarkserver.model.entities.Device;
import hb.humanbenchmarkserver.model.entities.Session;
import hb.humanbenchmarkserver.model.repositories.DeviceRepository;
import hb.humanbenchmarkserver.model.repositories.SessionRepository;
import hb.humanbenchmarkserver.payload.dto.CreateSessionDTO;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
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

        Session session = sessionRepository.save(
          Session
                  .builder()
                  .sessionCode(String.valueOf(sessionCode))
                  .gameCompleted(false)
                  .players(new ArrayList<Device>(List.of(player)))
                  .build()
        );

        return session.getSessionCode();
    }
}
