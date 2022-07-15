package com.gearservice;
import com.gearservice.model.authorization.Authority;
import com.gearservice.model.authorization.User;
import com.gearservice.repositories.jpa.UserRepository;
import com.gearservice.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.HashSet;

import static java.util.Collections.singletonList;

/**
 * Class GearServiceApplication is main, configurable class of application.
 *
 * @version 1.1
 * @author Dmitry
 * @since 21.01.2016
 */

@SpringBootApplication
@EnableTransactionManagement
@EnableCaching
@EnableJpaRepositories(basePackages = {"com.gearservice.repositories.jpa"})
public class GearServiceApplication {

    @Autowired UserRepository userRepository;
    @Autowired ApplicationService applicationService;

    public static void main(String[] args) {SpringApplication.run(GearServiceApplication.class, args);}

    @Bean
    CommandLineRunner init() {
        final String adminUser = "admin";
        return args -> {
            if (!userRepository.existsById(adminUser)) {
                Authority administrator = new Authority("ROLE_ADMIN");
                User admin = new User();
                admin.setUsername(adminUser);
                admin.setPassword(new BCryptPasswordEncoder().encode("b"));
                admin.setFullname(adminUser);
                admin.setEnabled(true);
                admin.setAuthorities(new HashSet<>(singletonList(administrator.withUsername(admin))));
                userRepository.save(admin);
            }

            applicationService.makeSample();
        };
    }
}
