package com.spring.godoc.core.exceptions.agendamento;

import com.spring.godoc.core.exceptions.base.BaseNotFoundException;

public class AgendamentoNotFoundException extends BaseNotFoundException {
    public AgendamentoNotFoundException(Long id) {
        super("Agendamento não encontrado: " + id);
    }
}
