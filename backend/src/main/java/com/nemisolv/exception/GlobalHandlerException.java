package com.nemisolv.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;
import java.util.List;

@RestControllerAdvice
@Slf4j
public class GlobalHandlerException extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ErrorDTO handleGenericException(HttpServletRequest request, Exception ex) {
        log.error("Request: " + request.getRequestURL() + " raised " + ex);
        ErrorDTO err = new ErrorDTO();
        err.setTimestamp(new Date());
        err.setCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        err.setPath(request.getRequestURI());
        err.addError(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase());
        return err;

    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorDTO handleBadRequestException(HttpServletRequest request, Exception ex) {
        log.error("Request: " + request.getRequestURL() + " raised " + ex);
        ErrorDTO err = new ErrorDTO();
        err.setTimestamp(new Date());
        err.setCode(HttpStatus.BAD_REQUEST.value());
        err.setPath(request.getRequestURI());
        err.addError(ex.getMessage());
        return err;

    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorDTO handleResourceNotFoundException(HttpServletRequest request, ResourceNotFoundException ex) {
        log.error("Request: " + request.getRequestURL() + " raised " + ex);
        ErrorDTO err = new ErrorDTO();
        err.setTimestamp(new Date());
        err.setCode(HttpStatus.NOT_FOUND.value());
        err.setPath(request.getServletPath());
        err.addError(ex.getMessage());
        return err;
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setTimestamp(new Date());
        errorDTO.setCode(HttpStatus.BAD_REQUEST.value());
        errorDTO.setPath(((ServletWebRequest) request).getRequest().getServletPath());

        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        fieldErrors.forEach(fieldError -> errorDTO.addError(fieldError.getDefaultMessage()));

        return new ResponseEntity<>(errorDTO, headers, status);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorDTO handleIllegalArgumentException(HttpServletRequest request, IllegalArgumentException ex) {
        log.error("Request: " + request.getRequestURI() + " raised " + ex);
        ErrorDTO err = new ErrorDTO();
        err.setTimestamp(new Date());
        err.setCode(HttpStatus.BAD_REQUEST.value());
        err.setPath(request.getServletPath());
        err.addError(ex.getMessage());
        return err;
    }




}
