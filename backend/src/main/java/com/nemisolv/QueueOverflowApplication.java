package com.nemisolv;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@Slf4j
public class QueueOverflowApplication {


    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(QueueOverflowApplication.class, args);
        String [] activeProfiles = applicationContext.getEnvironment().getActiveProfiles();
        log.info("Application is running in {} mode", String.join(",", activeProfiles));
    }
}
