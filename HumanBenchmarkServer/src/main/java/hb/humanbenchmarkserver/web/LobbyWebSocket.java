package hb.humanbenchmarkserver.web;

import hb.humanbenchmarkserver.model.entities.Device;
import hb.humanbenchmarkserver.model.entities.Lobby;
import hb.humanbenchmarkserver.payload.dto.JoinSessionDTO;
import hb.humanbenchmarkserver.payload.viewmodel.UserLog;
import hb.humanbenchmarkserver.service.DeviceService;
import hb.humanbenchmarkserver.service.SessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
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

    @MessageMapping("/lobby/{sessionCode}")
    @SendTo("/topic/players/{sessionCode}")
    public UserLog joinSession(@DestinationVariable String sessionCode, JoinSessionDTO dto) {

        try {
            log.info(dto.toString());

            Lobby lobby = sessionService.getSessionByCodeOrDefault(sessionCode);
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
                        .sessionCode(lobby.getSessionCode())
                        .deviceName(device.getUserName())
                        .build();
            } else {

                log.info("Leaving");

                // Logic for if a user left.
                lobby.getPlayers().remove(device);

                if (lobby.getPlayers().isEmpty()) {
                    sessionService.deleteSession(lobby);
                    return null;
                } else {
                    sessionService.save(lobby);
                }
                return UserLog
                        .builder()
                        .deviceName(device.getUserName())
                        .score(0)
                        .sessionCode(lobby.getSessionCode())
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
