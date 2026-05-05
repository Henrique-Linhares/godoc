package com.spring.godoc.modules.cadastro.medico;

import com.spring.godoc.modules.cadastro.user.UserEntity;
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

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
