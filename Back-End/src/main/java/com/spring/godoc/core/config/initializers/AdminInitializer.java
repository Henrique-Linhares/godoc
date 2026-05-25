package com.spring.godoc.core.config.initializers;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.spring.godoc.modules.cadastro.user.UserService;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final UserService userService;

    public AdminInitializer(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(String... args) {
        userService.saveAdmin("admin", "admin");
    }
}
