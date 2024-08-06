package com.nemisolv.service;

import com.nemisolv.payload.answer.AnswerResponseDTO;
import com.nemisolv.payload.answer.CreateAnswerRequest;
import com.nemisolv.payload.answer.GenerateAIAnswerRequest;
import com.nemisolv.payload.answer.UpvotingAnswerRequest;
import com.nemisolv.payload.question.CreateQuestionRequest;

import java.io.IOException;

public interface AnswerService {
    AnswerResponseDTO createAnswer(CreateAnswerRequest createAnswerRequest);

    void upvoteAnswer(UpvotingAnswerRequest upvoteAnswerRequest);

    void downvoteAnswer(UpvotingAnswerRequest upvoteAnswerRequest);

//    String generateAIAnswer(GenerateAIAnswerRequest createAnswerRequest) throws IOException;
}
