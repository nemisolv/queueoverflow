package com.nemisolv.payload.user;

import com.nemisolv.payload.tag.BasicTagInfo;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPreviewInfo {
    private Long id;
    private String firstName;
    private String lastName;
    private String picture;
    private String accountName;
    private BasicTagInfo[] tags;
}

