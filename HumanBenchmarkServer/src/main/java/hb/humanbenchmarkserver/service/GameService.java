package hb.humanbenchmarkserver.service;

import hb.humanbenchmarkserver.model.entities.Device;
import hb.humanbenchmarkserver.model.repositories.DeviceRepository;
import hb.humanbenchmarkserver.model.repositories.GameRepository;
import hb.humanbenchmarkserver.model.repositories.SessionRepository;
import hb.humanbenchmarkserver.payload.dto.JoinSessionDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author Raphael Paquin
 * @version 01
 * The service class that manages games.
 * 2024-04-17
 * HumanBenchmarkServer
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class GameService {

    private final DeviceRepository deviceRepository;
    private final GameRepository gameRepository;
    private final SessionRepository sessionRepository;

    public Boolean register(String name) {

        Optional<Device> device = deviceRepository.getDeviceByUserName(name);

        if (device.isPresent()) {
            return false;
        }

        deviceRepository.save(
                Device
                        .builder()
                        .donePlaying(false)
                        .score(0)
                        .userName(name)
                        .build()
        );
        return true;
    }

    public Boolean joinSession(JoinSessionDTO dto) {



    }

    public String createSession(int deviceId) {

    }


}
