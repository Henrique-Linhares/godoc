package com.spring.godoc.domains.agendamento.dtos.responses;

import com.spring.godoc.domains.agendamento.enums.StatusAgendamento;
import com.spring.godoc.domains.medico.MedicoEntity;
import com.spring.godoc.domains.paciente.PacienteEntity;

import java.time.LocalDateTime;

public record AgendamentoResponse(Long id, LocalDateTime data, StatusAgendamento status, PacienteEntity paciente, MedicoEntity medico) {
}
