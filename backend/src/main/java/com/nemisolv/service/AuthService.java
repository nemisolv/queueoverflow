package com.nemisolv.service;

import com.nemisolv.payload.auth.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthService {
    AuthenticationResponse authenticate(AuthenticationRequest authRequest);
    void register(RegisterRequest authRequest) ;
    void refreshToken(HttpServletRequest req, HttpServletResponse res) throws IOException;

    AuthenticationResponse verifyMfaCode(VerificationMfaRequest verificationMfaRequest);
    void verifyEmail(String token) ;

    void forgotPassword(String email);

    void resetPassword(ResetPasswordRequest reset) ;
}

