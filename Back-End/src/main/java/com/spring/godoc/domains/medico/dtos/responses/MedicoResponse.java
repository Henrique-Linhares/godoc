package com.spring.godoc.domains.medico.dtos.responses;

import com.spring.godoc.domains.user.UserEntity;

public record MedicoResponse(Long id, String crm, String nome, String especialidade, String telefone, UserEntity user) {
}
