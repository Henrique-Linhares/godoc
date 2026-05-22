package com.spring.godoc.modules.cadastro.medico.dtos.requests;

import com.spring.godoc.modules.cadastro.user.UserEntity;

public record MedicoRequest(String crm, String nome, String especialidade, String telefone, Long userId) { }
