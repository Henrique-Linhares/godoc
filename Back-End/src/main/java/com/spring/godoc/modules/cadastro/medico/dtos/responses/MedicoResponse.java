package com.spring.godoc.modules.cadastro.medico.dtos.responses;

import com.spring.godoc.modules.cadastro.user.UserEntity;

public record MedicoResponse(Long id, String crm, String nome, String especialidade, String telefone, String email, String role) {
}
