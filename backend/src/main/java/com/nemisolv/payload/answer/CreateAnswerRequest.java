package com.nemisolv.payload.answer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAnswerRequest {
    private String content;
    private Long questionId;

}
