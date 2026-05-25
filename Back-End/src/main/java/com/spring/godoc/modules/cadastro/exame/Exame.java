package com.spring.godoc.modules.cadastro.exame;

import java.time.LocalDate;

import jakarta.persistence.*;


@Entity
@Table(name = "exames")
public class Exame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomeExame;
    private LocalDate data;


}
