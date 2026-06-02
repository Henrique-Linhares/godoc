package com.spring.godoc.core.exceptions.user;

import com.spring.godoc.core.exceptions.base.BaseNotFoundException;

public class UserNotFoundException extends BaseNotFoundException {
    public UserNotFoundException(Long id) {
        super("Usuário não encontrado: " + id);
    }

    public UserNotFoundException(String email) {
        super("Usuário não encontrado: " + email);
    }
}
