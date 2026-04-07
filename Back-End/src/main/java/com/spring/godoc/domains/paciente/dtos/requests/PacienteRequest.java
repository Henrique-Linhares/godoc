package com.spring.godoc.domains.paciente.dtos.requests;

import com.spring.godoc.domains.user.UserEntity;

import java.util.Date;

public record PacienteRequest(String nome, Integer idade, String cpf, Date dataNascimento, String telefone, UserEntity user) {
}
