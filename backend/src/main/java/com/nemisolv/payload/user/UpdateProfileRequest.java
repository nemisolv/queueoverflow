package com.nemisolv.payload.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {
    private String firstName;
    private String lastName;
    private String location;
    private String bio;
    private String portfolioWebsite;
}
