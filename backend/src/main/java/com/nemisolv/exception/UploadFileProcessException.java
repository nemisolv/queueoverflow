package com.nemisolv.exception;

public class UploadFileProcessException extends RuntimeException{

    public UploadFileProcessException(String message) {
        super(message);
    }

    public UploadFileProcessException(String message, Throwable cause) {
        super(message, cause);
    }
}
