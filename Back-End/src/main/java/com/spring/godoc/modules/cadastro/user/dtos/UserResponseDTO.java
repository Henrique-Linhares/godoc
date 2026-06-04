package com.spring.godoc.modules.cadastro.user.dtos;

import com.spring.godoc.modules.cadastro.user.UserEntity;
import com.spring.godoc.modules.cadastro.user.enums.UserRoles;

public record UserResponseDTO(Long id, String email, UserRoles role) {

    public static UserResponseDTO from(UserEntity user) {
        return new UserResponseDTO(user.getId(), user.getEmail(), user.getRole());
    }
}
