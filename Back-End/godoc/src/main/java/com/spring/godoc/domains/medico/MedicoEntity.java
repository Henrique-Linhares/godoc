package com.spring.godoc.domains.medico;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "medicos")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MedicoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String crm;
    private String nome;
    private String especialidade;
    private String telefone;
}
