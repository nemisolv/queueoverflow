package com.nemisolv.payload.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@Builder
public class UserPreviewProfileDTO {
    private Long id;
    private String accountName;
    private String email;
    private String firstName;
    private String lastName;
    private String picture;
    private String bio;
    private String location;
    private String portfolioWebsite;
    private int totalQuestions;
    private int reputation;
    private Map<String,Integer> badgeCounts;
    private int totalAnswers;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
}
