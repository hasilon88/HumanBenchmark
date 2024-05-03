package hb.humanbenchmarkserver.payload.viewmodel;



import lombok.*;

/**
 * @author Raphael Paquin
 * @version 01
 * The user log of which user has joined or left.
 * 2024-04-22
 * HumanBenchmarkServer
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserLog {

    public String deviceName;
    public int score;
    // If false user left.
    public Boolean joined;
    public String sessionCode;
}
