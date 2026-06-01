package com.spring.godoc.modules.cadastro.paciente.dtos.requests;

import com.spring.godoc.modules.cadastro.user.UserEntity;

import java.util.Date;

public record PacienteRequest(String nome, Integer idade, String cpf, Date dataNascimento, String telefone) {
}
