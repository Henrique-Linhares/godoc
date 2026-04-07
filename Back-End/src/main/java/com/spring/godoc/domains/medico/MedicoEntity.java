package com.spring.godoc.domains.medico;

import com.spring.godoc.domains.exame.Exame;
import com.spring.godoc.domains.user.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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

//    @OneToMany(mappedBy = "medico")
//    private List<Exame> exames;
}
