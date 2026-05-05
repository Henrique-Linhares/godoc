package com.spring.godoc.config.initializers;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.spring.godoc.domains.user.UserEntity;
import com.spring.godoc.domains.user.UserRepository;
import com.spring.godoc.domains.user.enums.UserRoles;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // injeção de dependência via constructor
    public AdminInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        // Verifica se já existe algum usuário admin
        if (userRepository.existsByRole(UserRoles.ADMIN)) {
            return;
        }

        // CriaNDO o primeiro admin
        UserEntity admin = new UserEntity();
        admin.setEmail("admin");
        admin.setSenha(passwordEncoder.encode("admin"));  // Senha temporária
        admin.setRole(UserRoles.ADMIN);

        /*Salvando no banco*/
        userRepository.save(admin);

    }
}
