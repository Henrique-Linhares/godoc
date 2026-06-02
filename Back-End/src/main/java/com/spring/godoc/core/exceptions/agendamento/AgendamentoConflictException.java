package com.spring.godoc.core.exceptions.agendamento;

import com.spring.godoc.core.exceptions.base.BaseConflictException;

public class AgendamentoConflictException extends BaseConflictException {
    public AgendamentoConflictException() {
        super("Já existe um agendamento para esse médico nesse horário");
    }
}
