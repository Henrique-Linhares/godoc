package com.spring.godoc.modules.cadastro.user.dtos;

public record UserLoginResponse(
    String token,
    String email,
    String role,
    Long id,
    Long expiresIn
) {}
