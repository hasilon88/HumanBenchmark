package hb.humanbenchmarkserver.web;

import hb.humanbenchmarkserver.model.entities.Device;
import hb.humanbenchmarkserver.service.DeviceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Raphael Paquin
 * @version 01
 * The device REST interface.
 * 2024-04-24
 * HumanBenchmarkServer
 */
@RestController
@RequestMapping("/v1/device")
@RequiredArgsConstructor
@Slf4j
public class DeviceController
{
    private final DeviceService deviceService;

    @PostMapping("/register-device")
    @Operation(summary = "Registers a device.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200", description = "Registers a device.",
                    content = {
                            @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = Device.class))
                    }
            ),
            @ApiResponse(
                    responseCode = "400", description = "Bad Request.",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "422", description = "Device Already Exists.",
                    content = @Content
            )
    })
    public ResponseEntity<Device> registerDevice(@RequestParam String username) {
        try {

            if (deviceService.doesDeviceExist(username)) {
                return ResponseEntity.unprocessableEntity().body(null);
            }

            return ResponseEntity.ok(deviceService.save(
                    Device
                            .builder()
                            .userName(username.strip())
                            .score(0)
                            .donePlaying(false)
                            .build()
            ));

        } catch (Exception e) {
            log.error("Error registering device.");
            return ResponseEntity.badRequest().body(null);
        }
    }
}
