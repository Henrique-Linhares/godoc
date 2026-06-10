package com.spring.godoc.modules.cadastro.medico.dtos.requests;

import jakarta.validation.constraints.NotNull;

public record MedicoRequest(
        @NotNull String crm,
        @NotNull String nome,
        @NotNull String especialidade,
        @NotNull String telefone,
        @NotNull Long userId
) {}
