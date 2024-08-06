package com.nemisolv.payload.tag;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TagResponseDTO {
    private Long id;
    private String name;
    private String description;
    private int questionCount;
    private int followerCount;
    private boolean following;
//    private boolean isOwner;
//    private String createdAt;
//    private String updatedAt;

}
