package com.spring.godoc.core.exceptions.paciente;

import com.spring.godoc.core.exceptions.base.BaseNotFoundException;

public class PacienteNotFoundException extends BaseNotFoundException {
    public PacienteNotFoundException(Long id) {
        super("Paciente não encontrado: " + id);
    }
}
