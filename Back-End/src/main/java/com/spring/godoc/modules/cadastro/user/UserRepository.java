package com.spring.godoc.modules.cadastro.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.godoc.modules.cadastro.user.enums.UserRoles;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    Boolean existsByEmail(String email);

    Boolean existsByRole(UserRoles role);
}
