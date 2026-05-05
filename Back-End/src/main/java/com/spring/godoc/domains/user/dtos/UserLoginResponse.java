package com.spring.godoc.domains.user.dtos;

public record UserLoginResponse(
    String token,
    String email,
    String role,
    Long expiresIn
) {
    public UserLoginResponse(String token, String email, String role, Long expiresIn){
        this.token = token;
        this.email = email;
        this.role = role;
        this.expiresIn = expiresIn;
    };
}
