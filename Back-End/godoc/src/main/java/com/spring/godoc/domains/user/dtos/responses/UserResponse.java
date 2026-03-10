package com.spring.godoc.domains.user.dtos.responses;

import com.spring.godoc.domains.medico.MedicoEntity;
import com.spring.godoc.domains.paciente.PacienteEntity;

public record UserResponse(Long id, String email, String senha, MedicoEntity medico, PacienteEntity paciente) {
}
