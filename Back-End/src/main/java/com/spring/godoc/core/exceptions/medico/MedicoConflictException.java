package com.spring.godoc.core.exceptions.medico;

import com.spring.godoc.core.exceptions.base.BaseConflictException;

public class MedicoConflictException extends BaseConflictException {
    public MedicoConflictException(String crm) {
        super("Já existe um médico cadastrado com o CRM: " + crm);
    }
}
