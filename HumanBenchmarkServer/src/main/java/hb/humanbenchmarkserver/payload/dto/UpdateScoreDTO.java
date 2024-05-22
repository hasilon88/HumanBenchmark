package hb.humanbenchmarkserver.payload.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateScoreDTO {
    String deviceName;
    String sessionCode;
    Integer score;
}
