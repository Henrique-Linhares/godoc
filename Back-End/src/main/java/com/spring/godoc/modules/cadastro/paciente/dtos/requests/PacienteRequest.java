package com.spring.godoc.modules.cadastro.paciente.dtos.requests;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public record PacienteRequest(
        String nome,
        Integer idade,
        String cpf,

        @JsonFormat(pattern = "dd-MM-yyyy")
        LocalDate dataNascimento,

        String telefone
) {}
