package hb.humanbenchmarkserver.payload.dto;

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
public class JoinSessionDTO {
    String sessionCode;
    String deviceName;
}
