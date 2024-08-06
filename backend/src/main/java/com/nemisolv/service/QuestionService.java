package com.nemisolv.service;

import com.nemisolv.payload.PagedResponse;
import com.nemisolv.payload.answer.AnswerResponseDTO;
import com.nemisolv.payload.question.CreateQuestionRequest;
import com.nemisolv.payload.question.QuestionResponseDTO;
import com.nemisolv.payload.question.UpdateQuestionRequest;
import com.nemisolv.payload.question.UpvotingQuestionRequest;

import java.util.List;

public interface QuestionService {
    QuestionResponseDTO createQuestion(CreateQuestionRequest createQuestionRequest);
    PagedResponse<QuestionResponseDTO> getAllNonBannedQuestions(int pageNo, int pageSize,String sortBy, String sortOrder,String searchQuery);

    QuestionResponseDTO getQuestionBySlug(String slug);

    PagedResponse<AnswerResponseDTO> getQuestionAnswers(Long questionId, int pageNo, int pageSize, String sortBy, String sortOrder);

    void upvoteQuestion(UpvotingQuestionRequest upvoteQuestionRequest);

    void downvoteQuestion(UpvotingQuestionRequest upvoteQuestionRequest);

    void saveQuestion(Long questionId);

    PagedResponse<QuestionResponseDTO> getSavedQuestions(int pageNo, int pageSize, String sortBy, String sortOrder, String searchQuery);

    void deleteQuestion(Long questionId);

    void updateQuestion(String slug, UpdateQuestionRequest updateQuestionRequest);

    List<QuestionResponseDTO> getHotQuestions();
}
