package com.spring.godoc.modules.cadastro.user;

import java.util.List;
import java.util.Optional;

import com.spring.godoc.core.exceptions.user.UserConflictException;
import com.spring.godoc.core.exceptions.user.UserNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.godoc.modules.cadastro.user.dtos.UserRegisterRequestDTO;
import com.spring.godoc.modules.cadastro.user.dtos.UserUpdateRequestDTO;
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

    public UserEntity getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public UserEntity updateUser(Long id, UserUpdateRequestDTO request) {
        UserEntity user = getUserById(id);

        if (request.email() != null && !request.email().isBlank()) {
            if (!user.getEmail().equals(request.email()) && userRepository.existsByEmail(request.email())) {
                throw new UserConflictException();
            }
            user.setEmail(request.email());
        }

        if (request.password() != null && !request.password().isBlank()) {
            user.setSenha(passwordEncoder.encode(request.password()));
        }

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        UserEntity user = getUserById(id);
        userRepository.delete(user);
    }
}
