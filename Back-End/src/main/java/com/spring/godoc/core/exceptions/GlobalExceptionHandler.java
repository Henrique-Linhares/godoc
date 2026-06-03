package com.spring.godoc.core.exceptions;

import com.spring.godoc.core.exceptions.base.BaseConflictException;
import com.spring.godoc.core.exceptions.base.BaseNotFoundException;
import com.spring.godoc.core.exceptions.dtos.ErrorResponseDTO;
import org.springframework.boot.web.error.Error;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BaseNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleNotFound(BaseNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponseDTO(
                        404,
                        "Não encontrado",
                        exception.getMessage(),
                        LocalDateTime.now()
                ));
    }


    @ExceptionHandler(BaseConflictException.class)
    public ResponseEntity<ErrorResponseDTO> handleConflict(BaseConflictException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponseDTO(
                        409,
                        "Conflito",
                        exception.getMessage(),
                        LocalDateTime.now()
                ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleGeneric(Exception exception) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponseDTO(
                        500,
                        "Erro interno do servidor",
                        "Tente novamente.",
                        LocalDateTime.now()
                ));
    }
}
