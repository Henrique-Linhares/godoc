package com.spring.godoc.domains.paciente;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "pacientes")
@AllArgsConstructor
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

}
