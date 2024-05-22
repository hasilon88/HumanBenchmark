package hb.humanbenchmarkserver.web;

import hb.humanbenchmarkserver.model.entities.Device;
import hb.humanbenchmarkserver.model.entities.Lobby;
import hb.humanbenchmarkserver.payload.dto.UpdateScoreDTO;
import hb.humanbenchmarkserver.service.DeviceService;
import hb.humanbenchmarkserver.service.SessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.util.Set;

@RequiredArgsConstructor
@Controller
@Slf4j
public class GameWebSocket {
    private final SessionService sessionService;
    private final DeviceService deviceService;

    @MessageMapping("/game")
    public Lobby test(UpdateScoreDTO dto) {
        log.info(dto.toString());

        Lobby lobby = sessionService.getSessionByCodeOrDefault(dto.getSessionCode());

        if (lobby == null) {
            log.error("Lobby not found for session code: {}", dto.getSessionCode());
            return null;
        }

        Set<Device> players = lobby.getPlayers();

        for (Device player : players) {
            if (player.getUserName().equals(dto.getDeviceName())) {
                player.setScore(dto.getScore());
                deviceService.save(player);
                break;
            }
        }

        lobby.setPlayers(players);
        Lobby updatedLobby = sessionService.save(lobby);
        log.info(updatedLobby.toString());

        return updatedLobby;
    }

}
