package com.spring.godoc.domains.medico.dtos.requests;

import com.spring.godoc.domains.user.UserEntity;

public record MedicoRequest(String crm, String nome, String especialidade, String telefone, UserEntity user) {
}
