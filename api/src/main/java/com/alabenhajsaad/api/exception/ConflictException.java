package com.alabenhajsaad.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)  // Automatically returns HTTP 409
public class ConflictException extends RuntimeException {
    private Integer id ;
    public ConflictException(String message) {
        super(message);
    }

    public ConflictException(String message , Integer id) {
        super(message);
        this.id = id;
    }
    public Integer getId() {
        return id;
    }
}
