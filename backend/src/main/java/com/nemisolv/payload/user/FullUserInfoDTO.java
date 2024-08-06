package com.nemisolv.payload.user;

import com.nemisolv.entity.type.AuthProvider;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class FullUserInfoDTO {
    private Long id;
    private String accountName;
    private String email;
    private String firstName;
    private String lastName;
    private boolean verified;
    private String picture;
    private boolean mfaEnabled;
    private String[] roles;
    private String bio;
    private String location;
    private String portfolioWebsite;
    private String authProvider;
}
