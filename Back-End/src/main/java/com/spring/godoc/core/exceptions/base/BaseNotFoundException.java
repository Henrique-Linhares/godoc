package com.spring.godoc.core.exceptions.base;

public class BaseNotFoundException extends RuntimeException{
    public BaseNotFoundException(String message) {
        super(message);
    }
}
