package com.spring.godoc.domains.user;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.godoc.domains.user.dtos.UserRegisterRequestDTO;
import com.spring.godoc.domains.user.enums.UserRoles;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }; 

    public List<UserEntity> findAllUsers() {
        return userRepository.findAll();
    };

    public Optional<UserEntity> findById(@NonNull Long id) {
        return userRepository.findById(id);
    };

    public UserEntity saveUser(UserRegisterRequestDTO userRegisterRequestDTO) {

        if (userRepository.existsByEmail(userRegisterRequestDTO.email())) {
            throw new RuntimeException("Usuário já Cadastrado no Sistema");
        }

        String encodedPassword = passwordEncoder.encode(userRegisterRequestDTO.password());

        UserEntity newUser = new UserEntity(userRegisterRequestDTO.email(), encodedPassword, UserRoles.USER);

        return userRepository.save(newUser);
    };

}
