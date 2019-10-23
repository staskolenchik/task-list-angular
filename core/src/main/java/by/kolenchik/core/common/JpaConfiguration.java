package by.kolenchik.core.common;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories("by.kolenchik.core")
@EntityScan("by.kolenchik.core")
@ComponentScan("by.kolenchik.core")
public class JpaConfiguration {
}
