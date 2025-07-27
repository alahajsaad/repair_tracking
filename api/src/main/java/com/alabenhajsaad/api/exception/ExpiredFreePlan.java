package com.alabenhajsaad.api.exception;

public class ExpiredFreePlan extends RuntimeException{
    public ExpiredFreePlan(String message) {
        super(message);
    }
}
