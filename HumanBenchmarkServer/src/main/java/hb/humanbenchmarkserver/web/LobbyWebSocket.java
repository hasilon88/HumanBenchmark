package hb.humanbenchmarkserver.web;

import hb.humanbenchmarkserver.model.entities.Device;
import hb.humanbenchmarkserver.model.entities.Lobby;
import hb.humanbenchmarkserver.payload.dto.JoinSessionDTO;
import hb.humanbenchmarkserver.payload.viewmodel.UserLog;
import hb.humanbenchmarkserver.service.DeviceService;
import hb.humanbenchmarkserver.service.SessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * @author Raphael Paquin
 * @version 01
 * The controller that manages lobbies. Not REST.
 * 2024-04-23
 * HumanBenchmarkServer
 */
@RequiredArgsConstructor
@Controller
@Slf4j
public class LobbyWebSocket {

    private final SessionService sessionService;
    private final DeviceService deviceService;

    @MessageMapping("/lobby")
    @SendTo("/topic/players")
    public UserLog joinSession(JoinSessionDTO dto) {

        try {
            log.info("WEBSOCKET");
            Lobby lobby = sessionService.getSessionByCodeOrDefault(dto.getSessionCode());
            Device device = deviceService.getDeviceOrDefault(dto.getDeviceName());
            if (lobby == null || device == null || lobby.getIsStarted()) {
                return null;
            }

            if (dto.getJoined()) {
                log.info("Joining");
                device.setScore(0);
                lobby.getPlayers().add(device);
                sessionService.save(lobby);
                deviceService.save(device);
                return UserLog
                        .builder()
                        .joined(true)
                        .score(0)
                        .deviceName(device.getUserName())
                        .build();
            } else {

                log.info("Leaving");

                // Logic for if a user left.
                lobby.getPlayers().remove(device);
                sessionService.save(lobby);
                return UserLog
                        .builder()
                        .deviceName(device.getUserName())
                        .score(0)
                        .joined(false)
                        .build();

            }
        } catch (Exception e) {

            log.error("error in lobby web socket");
            log.error(e.getMessage());
            return null;
        }
    }
}
