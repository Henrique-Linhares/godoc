package com.spring.godoc.domains.paciente.dtos.responses;

import com.spring.godoc.domains.user.UserEntity;

import java.util.Date;

public record PacienteResponse(Long id, String nome, Integer idade, String cpf, Date dataNascimento, String telefone, UserEntity user) {
}
