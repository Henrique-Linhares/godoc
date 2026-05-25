package com.spring.godoc.modules.cadastro.user;

import com.spring.godoc.modules.cadastro.user.enums.UserRoles;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String senha;

    @Enumerated(EnumType.STRING)
    private UserRoles role;

    public UserEntity() {}

    public UserEntity(String email, String senha, UserRoles role) {
        this.email = email;
        this.senha = senha;
        this.role = role;
    }

    public Long getId() { return id; }

    public String getEmail() { return email; }
    void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    void setSenha(String senha) { this.senha = senha; }

    public UserRoles getRole() { return role; }
    void setRole(UserRoles role) { this.role = role; }
}
