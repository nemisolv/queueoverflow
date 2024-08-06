package com.nemisolv.payload.user;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserBasicInfoDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String picture;
}
