package com.nemisolv.payload.tag;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PopularTag {
    private Long id;
    private String name;
    private int totalQuestions;
}
