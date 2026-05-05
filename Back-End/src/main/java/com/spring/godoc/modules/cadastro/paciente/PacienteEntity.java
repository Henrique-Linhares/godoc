package com.spring.godoc.modules.cadastro.paciente;

import java.util.Date;

import com.spring.godoc.modules.cadastro.user.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pacientes")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PacienteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private Integer idade;
    private String cpf;
    private Date dataNascimento;
    private String telefone;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
