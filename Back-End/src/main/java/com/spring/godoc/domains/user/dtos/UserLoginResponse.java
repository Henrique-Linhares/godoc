package com.spring.godoc.domains.user.dtos;

public record UserLoginResponse(
    String token,
    String username,
    String role,
    Long expiresIn
) {
    public UserLoginResponse(String token, String username, String role, Long expiresIn){
        this.token = token;
        this.username = username;
        this.role = role;
        this.expiresIn = expiresIn;
    };
}
