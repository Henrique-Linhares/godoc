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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String senha;

    @OneToOne(mappedBy = "user")
    private PacienteEntity paciente;

    @OneToOne(mappedBy = "user")
    private MedicoEntity medico;

    @Enumerated(EnumType.STRING)
    private UserRoles role;
}
