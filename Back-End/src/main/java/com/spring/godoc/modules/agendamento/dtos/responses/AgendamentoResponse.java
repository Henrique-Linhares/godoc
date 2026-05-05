package com.spring.godoc.modules.agendamento.dtos.responses;

import com.spring.godoc.modules.agendamento.enums.StatusAgendamento;
import com.spring.godoc.modules.cadastro.medico.MedicoEntity;
import com.spring.godoc.modules.cadastro.paciente.PacienteEntity;

import java.time.LocalDateTime;

public record AgendamentoResponse(Long id, LocalDateTime data, StatusAgendamento status, PacienteEntity paciente, MedicoEntity medico) {
}
