package hb.humanbenchmarkserver.payload.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

/**
 * @author Raphael Paquin
 * @version 01
 * Data-transfer object for joining a session.
 * 2024-04-17
 * HumanBenchmarkServer
 */
@Builder
@Data
@Schema(description = "Object for joining or leaving a session.")
public class JoinSessionDTO {
    @Schema(description = "Whether the device is leaving or not.", example = "true")
    Boolean joined;
    @Schema(description = "The target session code.")
    String sessionCode;
    @Schema(description = "The target device that is interacting with the session.")
    String deviceName;
}
