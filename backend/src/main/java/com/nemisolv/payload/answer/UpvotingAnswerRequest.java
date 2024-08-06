package com.nemisolv.payload.answer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpvotingAnswerRequest {
    private Long answerId;
    private boolean hasupVoted;
    private boolean hasdownVoted;

}
