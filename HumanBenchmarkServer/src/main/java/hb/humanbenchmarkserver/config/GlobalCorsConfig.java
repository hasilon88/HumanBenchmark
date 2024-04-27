package hb.humanbenchmarkserver.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author Raphael Paquin
 * @version 01
 * Global CORS configuration.
 * 2024-04-26
 * HumanBenchmarkServer
 */
@Configuration
@EnableWebMvc
public class GlobalCorsConfig implements WebMvcConfigurer {

    @Value("${server.ip}")
    public String serverIp;

    @Value("${server.port}")
    public String serverPort;

    @Value("${frontend.port}")
    public String frontendPort;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowedOriginPatterns("*")
                .allowCredentials(true);
    }


}
