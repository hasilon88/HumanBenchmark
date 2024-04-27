package hb.humanbenchmarkserver.config;

import io.swagger.v3.core.converter.AnnotatedType;
import io.swagger.v3.core.converter.ModelConverters;
import io.swagger.v3.core.converter.ResolvedSchema;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.ErrorResponse;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

/**
 * @author Raphael Paquin
 * @version 01
 * The openApi 3.0 Configuration for the springboot application.
 * 2024-04-26
 * HumanBenchmarkServer
 */
@OpenAPIDefinition(
        info = @io.swagger.v3.oas.annotations.info.Info(
                contact = @io.swagger.v3.oas.annotations.info.Contact(
                        name = "Raphael .Paquin",
                        email = "raphaelpaquin19@gmail.com",
                        url = "https://www.linkedin.com/in/raphee/"
                ),
                title = "OpenApi specification - HumanBenchmark",
                version = "1.0"
        )
)
@Configuration
public class OpenAPI30Config {

    @Value("${server.ip}")
    private String serverIp;

    @Value("${server.port}")
    private String backendPort;

    @Bean
    public OpenApiCustomizer schemaCustomizer() {
        ResolvedSchema resolvedSchema = ModelConverters.getInstance()
                .resolveAsResolvedSchema(new AnnotatedType(ErrorResponse.class));
        return openApi -> openApi
                .schema(resolvedSchema.schema.getName(), resolvedSchema.schema);
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public-api")
                .pathsToMatch("/**")
                .build();
    }

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .addServersItem(new Server().url("http://" + serverIp + ":" + backendPort))
                .info(new Info()
                        .title("HumanBenchmark Restful API")
                        .description("This is the documentation of the HumanBenchmark's Restful API.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .email("raphaelpaquin19@gmail.com")
                                .name("Raphael .Paquin")
                        )
                );
    }
}
