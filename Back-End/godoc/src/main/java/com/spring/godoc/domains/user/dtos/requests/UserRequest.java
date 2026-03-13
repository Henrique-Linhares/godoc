package com.spring.godoc.domains.user.dtos.requests;

import com.spring.godoc.domains.medico.MedicoEntity;
import com.spring.godoc.domains.paciente.PacienteEntity;

public record UserRequest(String email, String senha, MedicoEntity medico, PacienteEntity paciente) {
}
