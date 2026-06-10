package com.spring.godoc.modules.cadastro.paciente;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PacienteRepository extends JpaRepository<PacienteEntity, Long> {
    Optional<PacienteEntity> findByCpf(String cpf);
}
