package com.nemisolv.payload.question;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpvotingQuestionRequest {
    private Long questionId;
    private boolean hasupVoted;
    private boolean hasdownVoted;

}
