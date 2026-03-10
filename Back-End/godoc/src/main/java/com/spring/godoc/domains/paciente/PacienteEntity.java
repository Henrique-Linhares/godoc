package com.spring.godoc.domains.paciente;

import java.sql.Date;
import java.util.List;

import com.spring.godoc.domains.exame.Exame;
import com.spring.godoc.domains.user.UserEntity;
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

//    @OneToMany(mappedBy = "paciente")
//    private List<Exame> exames;
}
