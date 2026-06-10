package com.spring.godoc.modules.cadastro.medico.dtos.requests;

public record MedicoUpdateRequest(
        String crm,
        String nome,
        String especialidade,
        String telefone
) {}
