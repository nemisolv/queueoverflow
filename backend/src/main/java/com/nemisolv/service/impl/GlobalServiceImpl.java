package com.nemisolv.service.impl;

import com.nemisolv.entity.Answer;
import com.nemisolv.entity.Question;
import com.nemisolv.entity.Tag;
import com.nemisolv.entity.User;
import com.nemisolv.payload.global.GlobalSearchParams;
import com.nemisolv.payload.global.GlobalSearchResponse;
import com.nemisolv.repository.AnswerRepository;
import com.nemisolv.repository.QuestionRepository;
import com.nemisolv.repository.TagRepository;
import com.nemisolv.repository.UserRepository;
import com.nemisolv.service.GlobalService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GlobalServiceImpl implements GlobalService {
    private final UserRepository userRepo;
    private final QuestionRepository questionRepo;
    private final AnswerRepository answerRepo;
    private final TagRepository tagRepo;
    private final List<String> SearchableTypes = Arrays.asList("question", "user", "answer", "tag");

    @Override
    public List<GlobalSearchResponse> globalSearch(GlobalSearchParams params) {

        List<GlobalSearchResponse> response = new ArrayList<>();
        String query = params.getGlobalSearch();
        String type = params.getType();
        if(type == null || type.isEmpty() || !SearchableTypes.contains(type)) {
            // search all
            Pageable pageable = PageRequest.of(0,2);
            List<Question> questions = questionRepo.searchByTitleValidQuestions(query, pageable);
            questions.forEach(question -> {
                response.add(new GlobalSearchResponse(question.getId(), question.getTitle(), question.getSlug(),"question" ));
            });

            List<User> users = userRepo.searchByNameValidUsers(query, pageable);
            users.forEach(user -> {
                response.add(new GlobalSearchResponse(user.getId(), user.getFirstName() + " " + user.getLastName(), "user"));
            });

            List<Answer> answers = answerRepo.searchByContentValidAnswers(query, pageable);
            answers.forEach(answer -> {
                response.add(new GlobalSearchResponse(answer.getId(), answer.getContent(), "answer"));
            });

            List<Tag> tags = tagRepo.findByTagName(query, pageable);
            tags.forEach(tag -> {
                response.add(new GlobalSearchResponse(tag.getId(), tag.getName(), "tag"));
            });


        }else {
            // search by type
                Pageable pageable = PageRequest.of(0,8);
            switch (type.toLowerCase()) {
                case "question":
                    // search question
                    List<Question> questions = questionRepo.searchByTitleValidQuestions(query, pageable);
                    questions.forEach(question -> {
                        response.add(new GlobalSearchResponse(question.getId(), question.getTitle(), "question"));
                    });

                    break;
                case "user":
                    // search user
                    List<User> users = userRepo.searchByNameValidUsers(query, pageable);
                    users.forEach(user -> {
                        response.add(new GlobalSearchResponse(user.getId(), user.getFirstName() + " " + user.getLastName(), "user"));
                    });
                    break;
                case "answer":
                    // search answer
                    List<Answer> answers = answerRepo.searchByContentValidAnswers(query, pageable);
                    answers.forEach(answer -> {
                        response.add(new GlobalSearchResponse(answer.getId(), answer.getContent(),answer.getQuestion().getSlug(), "answer"));
                    });
                    break;
                case "tag":
                    // search tag
                    List<Tag> tags = tagRepo.findByTagName(query, pageable);
                    tags.forEach(tag -> {
                        response.add(new GlobalSearchResponse(tag.getId(), tag.getName(), "tag"));
                    });
                    break;
            }
        }



        return response;
    }
}
