package com.spring.godoc.core.exceptions.medico;

import com.spring.godoc.core.exceptions.base.BaseNotFoundException;

public class MedicoNotFoundException extends BaseNotFoundException {
    public MedicoNotFoundException(Long id) {
        super("Médico não encontrado: " + id);
    }
}
