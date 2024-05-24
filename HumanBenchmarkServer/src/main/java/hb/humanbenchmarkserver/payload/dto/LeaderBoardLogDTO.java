package hb.humanbenchmarkserver.payload.dto;


import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class LeaderBoardLogDTO implements Serializable {
    String deviceName;
    String sessionCode;
}
