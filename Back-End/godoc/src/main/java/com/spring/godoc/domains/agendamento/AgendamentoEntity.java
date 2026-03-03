package com.spring.godoc.domains.agendamento;

import java.time.LocalDateTime;

import com.spring.godoc.domains.agendamento.enums.StatusAgendamento;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
@Entity
@Table(name = "agendamentos")
@AllArgsConstructor
@Data
public class AgendamentoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime data;
    private StatusAgendamento status;

}
