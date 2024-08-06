package com.nemisolv.controller;

import com.nemisolv.payload.answer.AnswerResponseDTO;
import com.nemisolv.payload.answer.CreateAnswerRequest;
import com.nemisolv.payload.answer.GenerateAIAnswerRequest;
import com.nemisolv.payload.answer.UpvotingAnswerRequest;
import com.nemisolv.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/answers")
public class AnswerController {
    private final AnswerService answerService;

    @PostMapping
    public ResponseEntity<?> createAnswer(@RequestBody CreateAnswerRequest createAnswerRequest) {
        AnswerResponseDTO answer = answerService.createAnswer(createAnswerRequest);
        URI uri = UriComponentsBuilder.fromPath("/api/v1/answers/{id}")
                .buildAndExpand(answer.getId()).toUri();

        return ResponseEntity.created(uri).body(answer);
    }

    // voting answer( can be upvote)
    @PostMapping("/upvote")
    public ResponseEntity<?> upvoteAnswer(@RequestBody UpvotingAnswerRequest upvoteAnswerRequest) {
        answerService.upvoteAnswer(upvoteAnswerRequest);
        return ResponseEntity.ok().build();
    }

    // voting answer( can be downvote)
    @PostMapping("/downvote")
    public ResponseEntity<?> downvoteAnswer(@RequestBody UpvotingAnswerRequest upvoteAnswerRequest) {
        answerService.downvoteAnswer(upvoteAnswerRequest);
        return ResponseEntity.ok().build();
    }


//    @PostMapping("/chatgpt/generate-ai-answer")
//    public ResponseEntity<?> generateAIAnswer(@RequestBody GenerateAIAnswerRequest createAnswerRequest) {
//        String answer = null;
//        try {
//            answer = answerService.generateAIAnswer(createAnswerRequest);
//        if(answer ==null) {
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.ok().body(answer);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.badRequest().body("Error while generating AI answer");
//        }
//
//    }



}
