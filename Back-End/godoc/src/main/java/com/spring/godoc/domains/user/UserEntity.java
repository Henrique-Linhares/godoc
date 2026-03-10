package com.spring.godoc.domains.user;

import com.spring.godoc.domains.medico.MedicoEntity;
import com.spring.godoc.domains.paciente.PacienteEntity;
import jakarta.persistence.*;
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
}
