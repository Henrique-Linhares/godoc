package com.spring.godoc.modules.cadastro.exame;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "exames")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Exame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomeExame;
    private LocalDate data;
}
