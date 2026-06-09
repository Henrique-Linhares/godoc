package com.spring.godoc.modules.agendamento;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface AgendamentoRepository extends JpaRepository<AgendamentoEntity, Long> {

    boolean existsByMedicoIdAndIdNotAndInicioBeforeAndFimAfter(
            Long medicoId,
            Long idExcluir,
            LocalDateTime novoFim,
            LocalDateTime novoInicio
    );
}
