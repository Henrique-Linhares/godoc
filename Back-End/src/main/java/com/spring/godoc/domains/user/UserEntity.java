package com.spring.godoc.domains.user;

import com.spring.godoc.domains.medico.MedicoEntity;
import com.spring.godoc.domains.paciente.PacienteEntity;
import com.spring.godoc.domains.user.enums.UserRoles;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

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

    public UserEntity() {};

    public UserEntity(String email, String senha, UserRoles role) {
        this.email = email;
        this.senha = senha;
        this.role = role;
    };

    public Long getId() { return id; };
    public void setId(Long id) { this.id = id; };

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; };

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; };

    public UserRoles getRole() { return role; };
    public void setRole(UserRoles role) { this.role = role; };
}
