package hb.humanbenchmarkserver.web;

import hb.humanbenchmarkserver.model.entities.Device;
import hb.humanbenchmarkserver.model.entities.Lobby;
import hb.humanbenchmarkserver.payload.viewmodel.LeaderBoardLogViewModel;
import hb.humanbenchmarkserver.service.DeviceService;
import hb.humanbenchmarkserver.service.SessionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

/**
 * @author Raphael Paquin
 * @version 01
 * Rest controller for lobbies.
 * 2024-04-23
 * HumanBenchmarkServer
 */
@RestController
@RequestMapping("/v1/lobby")
@RequiredArgsConstructor
@Slf4j
public class LobbyController {

    private final SessionService sessionService;
    private final DeviceService deviceService;

    @GetMapping("/get-lobby")
    @Operation(summary = "Gets a lobby's players.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Fetched lobby information.",
                    content = {
                            @Content(mediaType = "application/json",
                                    array = @ArraySchema( schema = @Schema(implementation = Device.class)))
                    }
            ),
            @ApiResponse(
                    responseCode = "400", description = "Bad Request.",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404", description = "Lobby not found.",
                    content = @Content
            )
    })
    public ResponseEntity<List<Device>> getLobby(@RequestParam String lobbyCode) {

        Lobby lobby = sessionService.getSessionByCodeOrDefault(lobbyCode);
        try {

            assert lobby != null;
            log.info("CONTROLLER: " + lobby.getPlayers());
            return ResponseEntity.ok(lobby.getPlayers().stream().toList());
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }
    }

    @GetMapping("/create-lobby")
    @Operation(summary = "Creates a lobby.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Creates a lobby.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = String.class))
                    }
            ),
            @ApiResponse(
                    responseCode = "400", description = "Bad Request.",
                    content = @Content
            ),
    })
    public ResponseEntity<String> createLobby(@RequestParam String deviceName) {

        Device device = deviceService.getDeviceOrDefault(deviceName);

        if (device == null) {
            return ResponseEntity.badRequest().body("Device not found");
        }

        try {
            Lobby lobby = Lobby
                    .builder()
                    .isStarted(false)
                    .gameCompleted(false)
                    .players(new HashSet<>())
                    .sessionCode(sessionService.generateSessionCode())
                    .build();
            lobby.getPlayers().add(device);
            lobby = sessionService.save(lobby);
            log.info("LOBBY CREATION : {}", lobby);
            return ResponseEntity.ok(lobby.getSessionCode());

        } catch (Exception e) {
            log.error("Error creating lobby: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Error creating lobby");
        }
    }

    @GetMapping("/get-lobby-scores")
    @Operation(summary = "Gets a lobby's player's that are done.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Scanners sent successfully.",
                    content = {
                            @Content(mediaType = "application/json",
                                    array = @ArraySchema(schema = @Schema(implementation = LeaderBoardLogViewModel.class)))
                    }
            ),
            @ApiResponse(
                    responseCode = "400", description = "Bad Request.",
                    content = @Content
            ),
    })
    public ResponseEntity<Collection<LeaderBoardLogViewModel>> getCurrentSession(@RequestParam String sessionCode, @RequestParam Integer nthPlaceFinished) {
        try {
            Lobby lobby = sessionService.getSessionByCodeOrDefault(sessionCode);
            assert lobby != null;
            ArrayList<LeaderBoardLogViewModel> leaderBoardLogViewModels = new ArrayList<>();
            for (Device device:lobby.getPlayers()) {
                if (device.getDonePlaying()) {
                    leaderBoardLogViewModels.add(
                            LeaderBoardLogViewModel
                                    .builder()
                                    .isLastToFinish(nthPlaceFinished == lobby.getPlayers().size())
                                    .score(device.getScore())
                                    .deviceName(device.getUserName())
                                    .build()
                    );
                }
            }
            return ResponseEntity.ok().body(leaderBoardLogViewModels);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
