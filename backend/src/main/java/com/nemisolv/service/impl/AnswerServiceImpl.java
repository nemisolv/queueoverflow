package com.nemisolv.service.impl;


import com.nemisolv.entity.Answer;
import com.nemisolv.entity.Question;
import com.nemisolv.entity.User;
import com.nemisolv.exception.BadRequestException;
import com.nemisolv.helper.OpenAIRequest;
import com.nemisolv.helper.OpenAIResponse;
import com.nemisolv.payload.answer.AnswerResponseDTO;
import com.nemisolv.payload.answer.CreateAnswerRequest;
import com.nemisolv.payload.answer.GenerateAIAnswerRequest;
import com.nemisolv.payload.answer.UpvotingAnswerRequest;
import com.nemisolv.repository.AnswerRepository;
import com.nemisolv.repository.QuestionRepository;
import com.nemisolv.repository.UserRepository;
import com.nemisolv.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerServiceImpl implements AnswerService {
    private final AnswerRepository answerRepo;
    private final UserRepository userRepo;
    private final QuestionRepository questionRepo;
    private final ModelMapper modelMapper;
    private final RestTemplate restTemplate;

    @Value("${app.ai.gpt-secret-key}")
    private String secretKeyAI;

    @Override
    public AnswerResponseDTO createAnswer(CreateAnswerRequest createAnswerRequest) {
        Optional<Question> optionalQuestion = questionRepo.findById(createAnswerRequest.getQuestionId());
        if (optionalQuestion.isEmpty()) {
            throw new BadRequestException("Question not found");
        }
        User author = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Answer newAnswer = Answer.builder()
                .content(createAnswerRequest.getContent())
                .question(optionalQuestion.get())
                .author(author)
                .build();
        Answer savedAnswer = answerRepo.save(newAnswer);
        return modelMapper.map(savedAnswer, AnswerResponseDTO.class);
    }

    @Override
    public void upvoteAnswer(UpvotingAnswerRequest upvoteAnswerRequest) {
        Answer answer = answerRepo.findById(upvoteAnswerRequest.getAnswerId()).orElseThrow(() -> new BadRequestException("Answer not found"));
        User upvoter = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (upvoteAnswerRequest.isHasupVoted()) {
            answer.getUpvotes().remove(upvoter);
        } else if (upvoteAnswerRequest.isHasdownVoted()) {
            answer.getUpvotes().add(upvoter);
            answer.getDownvotes().remove(upvoter);
        } else {
            answer.getUpvotes().add(upvoter);
        }

        // increment reputation of upvoter and author
        upvoter.increaseReputation(1);
        answer.getAuthor().increaseReputation(2);

        userRepo.save(upvoter);

        answerRepo.save(answer);

    }

    @Override
    public void downvoteAnswer(UpvotingAnswerRequest upvoteAnswerRequest) {
        Answer answer = answerRepo.findById(upvoteAnswerRequest.getAnswerId()).orElseThrow(() -> new BadRequestException("Answer not found"));
        User downvoter = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (upvoteAnswerRequest.isHasdownVoted()) {
            answer.getDownvotes().remove(downvoter);
        } else if (upvoteAnswerRequest.isHasupVoted()) {
            answer.getDownvotes().add(downvoter);
            answer.getUpvotes().remove(downvoter);
        } else {
            answer.getDownvotes().add(downvoter);
        }

        // decrement reputation of downvoter and author
        downvoter.decreaseReputation(1);
        answer.getAuthor().decreaseReputation(2);

        userRepo.save(downvoter);

        answerRepo.save(answer);

    }

//    @Override
//    public String generateAIAnswer(GenerateAIAnswerRequest createAnswerRequest) throws IOException {
//        String question = createAnswerRequest.getQuestionContent();
//        // call AI service
//        // TODO(developer): Replace these variables before running the sample.
//        String projectId = "totemic-alchemy-428818-p4";
//        String location = "us-central1";
//        String modelName = "gemini-1.5-flash-001";
//        String textPrompt =createAnswerRequest.getQuestionContent();
//
//        String output = textInput(projectId, location, modelName, textPrompt);
//        return output;
//    }

    // Passes the provided text input to the Gemini model and returns the text-only response.
    // For the specified textPrompt, the model returns a list of possible store names.
//    public static String textInput(
//            String projectId, String location, String modelName, String textPrompt) throws IOException {
//        // Initialize client that will be used to send requests. This client only needs
//        // to be created once, and can be reused for multiple requests.
//        try (VertexAI vertexAI = new VertexAI(projectId, location)) {
//            GenerativeModel model = new GenerativeModel(modelName, vertexAI);
//
//            GenerateContentResponse response = model.generateContent(textPrompt);
//            String output = ResponseHandler.getText(response);
//            return output;
//        }
//    }

}