package com.spring.godoc.modules.agendamento;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AgendamentoRepository extends JpaRepository<AgendamentoEntity, Long> {

    //Lógica para evitar a sobreposição de horários
    /*
    Situação 1 — o agendamento existente começa antes e termina dentro do novo:
    Existente:  13h -------- 14h30
    Novo:              14h -------- 15h
    Bate em 14h~14h30.

    Situação 2 — o agendamento existente está completamente dentro do novo:


    Existente:       14h15 -- 14h45
    Novo:       14h -------------- 15h
    Bate em 14h15~14h45.

    Situação 3 — o agendamento existente começa dentro e termina depois do novo:


    Existente:            14h30 -------- 15h30
    Novo:       14h -------- 15h
    Bate em 14h30~15h.
    */
    boolean existsByMedicoIdAndIdNotAndInicioBeforeAndFimAfter(
            Long medicoId,
            Long idExcluir,
            LocalDateTime novoFim,
            LocalDateTime novoInicio
    );
}
