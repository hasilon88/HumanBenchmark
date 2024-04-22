package hb.humanbenchmarkserver;

import hb.humanbenchmarkserver.model.repositories.DeviceRepository;
import hb.humanbenchmarkserver.service.SessionService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HumanBenchmarkServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(HumanBenchmarkServerApplication.class, args);
    }

}
