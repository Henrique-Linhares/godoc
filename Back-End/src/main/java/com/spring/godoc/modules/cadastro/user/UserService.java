package com.spring.godoc.modules.cadastro.user;

import java.util.List;
import java.util.Optional;

import com.spring.godoc.core.exceptions.user.UserConflictException;
import com.spring.godoc.core.exceptions.user.UserNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.godoc.modules.cadastro.user.dtos.UserRegisterRequestDTO;
import com.spring.godoc.modules.cadastro.user.enums.UserRoles;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserEntity> findAllUsers() {
        return userRepository.findAll();
    }

    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));
    }

    public Optional<UserEntity> findById(Long id) {
        return userRepository.findById(id);
    }

    public UserEntity saveUser(UserRegisterRequestDTO userRegisterRequestDTO) {
        if (userRepository.existsByEmail(userRegisterRequestDTO.email())) {
            throw new UserConflictException();
        }

        String encodedPassword = passwordEncoder.encode(userRegisterRequestDTO.password());
        UserEntity newUser = new UserEntity(userRegisterRequestDTO.email(), encodedPassword, UserRoles.USER);

        return userRepository.save(newUser);
    }

    public void saveAdmin(String email, String senha) {
        if (userRepository.existsByRole(UserRoles.ADMIN)) {
            return;
        }
        UserEntity admin = new UserEntity(email, passwordEncoder.encode(senha), UserRoles.ADMIN);
        userRepository.save(admin);
    }
}
