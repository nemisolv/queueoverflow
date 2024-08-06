package com.nemisolv.controller;

import com.nemisolv.exception.ResourceNotFoundException;
import com.nemisolv.payload.PagedResponse;
import com.nemisolv.payload.ResponseMessage;
import com.nemisolv.payload.question.CreateQuestionRequest;
import com.nemisolv.payload.question.QuestionResponseDTO;
import com.nemisolv.payload.question.UpdateQuestionRequest;
import com.nemisolv.payload.question.UpvotingQuestionRequest;
import com.nemisolv.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/questions")
public class QuestionController {
    private final QuestionService questionService;

//    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping
    public ResponseEntity<?> createQuestion(@RequestBody CreateQuestionRequest createQuestionRequest) {
        QuestionResponseDTO newQuestion = questionService.createQuestion(createQuestionRequest);
        return ResponseEntity.ok(newQuestion);
    }

    @GetMapping
    public ResponseEntity<PagedResponse<QuestionResponseDTO>> getAllNonBannedQuestions(@RequestParam(defaultValue = "1") int pageNo,
                                                                  @RequestParam(defaultValue = "10") int pageSize,
                                                                  @RequestParam(defaultValue = "createdAt") String sortBy,
                                                                  @RequestParam(defaultValue = "desc") String sortOrder,
                                                                  @RequestParam(defaultValue = "") String searchQuery) {
        return ResponseEntity.ok(questionService.getAllNonBannedQuestions(pageNo, pageSize, sortBy, sortOrder, searchQuery));
    }

    @GetMapping("/public/{slug}")
    public ResponseEntity<?> getQuestionBySlug(@PathVariable String slug) {
       try {
           QuestionResponseDTO questionBySlug = questionService.getQuestionBySlug(slug);
           return ResponseEntity.ok(questionBySlug);
       }catch(ResourceNotFoundException ex) {
              return new ResponseEntity<>(new ResponseMessage(ex.getMessage()), HttpStatus.NOT_FOUND);
       }
    }

    @GetMapping("/public/{questionId}/answers")
    public ResponseEntity<?> getQuestionAnswers(@PathVariable Long questionId,
                                                @RequestParam(defaultValue = "1") int pageNo,
                                               @RequestParam(defaultValue = "10") int pageSize,
                                               @RequestParam(defaultValue = "createdAt") String sortBy,
                                               @RequestParam(defaultValue = "desc") String sortOrder){
        return ResponseEntity.ok(questionService.getQuestionAnswers(questionId, pageNo, pageSize, sortBy, sortOrder));
    }

    // voting question( can be upvote)
    @PostMapping("/upvote")
    public ResponseEntity<?> upvoteQuestion(@RequestBody UpvotingQuestionRequest upvoteQuestionRequest) {
        questionService.upvoteQuestion(upvoteQuestionRequest);
        return ResponseEntity.noContent().build();
    }

    // voting question( can be downvote)
    @PostMapping("/downvote")
    public ResponseEntity<?> downvoteQuestion(@RequestBody UpvotingQuestionRequest upvoteQuestionRequest) {
        questionService.downvoteQuestion(upvoteQuestionRequest);
        return ResponseEntity.noContent().build();
    }


    // toggle save question
    @PostMapping("{questionId}/save")
    public ResponseEntity<?> saveQuestion(@PathVariable Long questionId) {
        questionService.saveQuestion(questionId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/saved")
    public ResponseEntity<PagedResponse<QuestionResponseDTO>> getSavedQuestions(@RequestParam(defaultValue = "1") int pageNo,
                                                                               @RequestParam(defaultValue = "10") int pageSize,
                                                                               @RequestParam(defaultValue = "createdAt") String sortBy,
                                                                               @RequestParam(defaultValue = "desc") String sortOrder,
                                                                                @RequestParam(defaultValue = "") String searchQuery){
        return ResponseEntity.ok(questionService.getSavedQuestions(pageNo, pageSize, sortBy, sortOrder, searchQuery));
    }

    @DeleteMapping("{questionId}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long questionId) {
        questionService.deleteQuestion(questionId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("{slug}")
    public ResponseEntity<?> updateQuestion(@PathVariable String slug, @RequestBody UpdateQuestionRequest updateQuestionRequest) {
        questionService.updateQuestion(slug, updateQuestionRequest);
        return ResponseEntity.noContent().build();
    }

    // show hot questions
    @GetMapping("/public/hot")
    public ResponseEntity<?> getHotQuestions() {
        return ResponseEntity.ok(questionService.getHotQuestions());
    }



}
