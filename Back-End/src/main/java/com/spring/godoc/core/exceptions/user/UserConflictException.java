package com.spring.godoc.core.exceptions.user;

import com.spring.godoc.core.exceptions.base.BaseConflictException;

public class UserConflictException extends BaseConflictException {
    public UserConflictException() {
        super("Usuário já Cadastrado no Sistema");
    }
}
