package com.nemisolv.controller;

import com.nemisolv.exception.BadRequestException;
import com.nemisolv.payload.ResponseMessage;
import com.nemisolv.payload.auth.*;
import com.nemisolv.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authRequest) {

        try {
            AuthenticationResponse response = authService.authenticate(authRequest);
            return ResponseEntity.ok(response);
        }catch (BadCredentialsException ex) {
            return new ResponseEntity<>(new ResponseMessage("Invalid email or password"), HttpStatusCode.valueOf(401));
        }

    }

    @PostMapping("/register")
    public ResponseEntity<ResponseMessage> register(@RequestBody RegisterRequest authRequest)  {
     authService.register(authRequest);
        return new ResponseEntity<>(new ResponseMessage("User registered successfully"), HttpStatusCode.valueOf(201));
    }



    @PostMapping("/public/verify-email")
    public ResponseEntity<ResponseMessage> verifyEmail(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        authService.verifyEmail(token);
        return ResponseEntity.ok(new ResponseMessage("Email verified successfully"));
    }


    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest req, HttpServletResponse res) throws IOException {
        authService.refreshToken(req, res);
    }

    @PostMapping("/public/verify-mfa")
    public ResponseEntity<?> verifyMfaCode(@RequestBody VerificationMfaRequest verificationMfaRequest) {
        AuthenticationResponse authenticationResponse = authService.verifyMfaCode(verificationMfaRequest);
        return ResponseEntity.ok(authenticationResponse);
    }

    @PostMapping("/public/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        authService.forgotPassword(forgotPasswordRequest.getEmail());
        return ResponseEntity.ok(new ResponseMessage("Sent email to reset password successfully"));
    }

    @PostMapping("/public/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) throws BadRequestException {
        authService.resetPassword(request);
        return ResponseEntity.ok(new ResponseMessage("Reset password successfully"));
    }
}
