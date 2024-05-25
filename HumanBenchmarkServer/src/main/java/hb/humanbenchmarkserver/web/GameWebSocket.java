package hb.humanbenchmarkserver.web;

import hb.humanbenchmarkserver.model.entities.Device;
import hb.humanbenchmarkserver.model.entities.Lobby;
import hb.humanbenchmarkserver.payload.dto.LeaderBoardLogDTO;
import hb.humanbenchmarkserver.payload.dto.UpdateScoreDTO;
import hb.humanbenchmarkserver.payload.viewmodel.LeaderBoardLogViewModel;
import hb.humanbenchmarkserver.service.DeviceService;
import hb.humanbenchmarkserver.service.SessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Optional;
import java.util.Set;

@RequiredArgsConstructor
@Controller
@Slf4j
public class GameWebSocket {
    private final SessionService sessionService;
    private final DeviceService deviceService;

    @MessageMapping("/game")
    @SendTo("/topic/game")
    public Lobby updateScore(UpdateScoreDTO dto) {
        log.info(dto.toString());

        Lobby lobby = sessionService.getSessionByCodeOrDefault(dto.getSessionCode());

        if (lobby == null) {
            log.error("Lobby not found for session code: {}", dto.getSessionCode());
            return null;
        }

        Set<Device> players = lobby.getPlayers();

        for (Device player : players) {
            if (player.getUserName().equals(dto.getDeviceName())) {
                player.setScore(dto.getScore() + player.getScore());
                deviceService.save(player);
                break;
            }
        }

        lobby.setPlayers(players);
        Lobby updatedLobby = sessionService.save(lobby);
        log.info(updatedLobby.toString());

        return updatedLobby;
    }

    @MessageMapping("/leaderboard")
    @SendTo("/topic/leaderboard")
    public LeaderBoardLogViewModel leaderboardStatus(LeaderBoardLogDTO dto) {


        log.info(dto.getDeviceName() + " IN LEADERBOARD");
        Device device = this.deviceService.getDeviceOrDefault(dto.getDeviceName());
        Lobby lobby = sessionService.getSessionByCodeOrDefault(dto.getSessionCode());
        assert lobby != null;
        assert device != null;

        return LeaderBoardLogViewModel
                .builder()
                .isLastToFinish(device.getNthPlaceFinished() == lobby.getPlayers().size())
                .score(device.getScore())
                .deviceName(device.getUserName())
                .build();
    }

}
