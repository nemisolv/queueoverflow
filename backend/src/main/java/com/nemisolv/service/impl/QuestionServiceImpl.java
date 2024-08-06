package com.nemisolv.service.impl;


import com.nemisolv.entity.*;
import com.nemisolv.entity.type.InteractionType;
import com.nemisolv.exception.BadRequestException;
import com.nemisolv.exception.ResourceNotFoundException;
import com.nemisolv.payload.PagedResponse;
import com.nemisolv.payload.answer.AnswerResponseDTO;
import com.nemisolv.payload.question.CreateQuestionRequest;
import com.nemisolv.payload.question.QuestionResponseDTO;
import com.nemisolv.payload.question.UpdateQuestionRequest;
import com.nemisolv.payload.question.UpvotingQuestionRequest;
import com.nemisolv.payload.tag.BasicTagInfo;
import com.nemisolv.payload.user.UserBasicInfoDTO;
import com.nemisolv.repository.*;
import com.nemisolv.service.QuestionService;
import com.nemisolv.util.SlugUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepo;
    private final AnswerRepository answerRepo;
    private final TagRepository tagRepo;
    private final UserRepository userRepo;
    private final ModelMapper modelMapper;
    private final InteractionRepository interactionRepo;

    @Override
    public QuestionResponseDTO createQuestion(CreateQuestionRequest createQuestionRequest) {
        // check tags if not exist create new tag, if exist get tag id
        Set<Tag> tags = new HashSet<>();

        for (var tagName :
                createQuestionRequest.getTags()) {
            tagRepo.findByNameIgnoreCase(tagName).ifPresentOrElse(
                    tags::add,
                    () -> tags.add(tagRepo.save(new Tag(tagName)))
            );

        }

        User author = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Question newQuestion = Question.builder()
                .title(createQuestionRequest.getTitle())
                .explanation(createQuestionRequest.getExplanation())
                .tags(tags)
                .author(author)
                .slug(generateUniqueSlug(createQuestionRequest.getTitle()))
                .build();




        Question savedQuestion = questionRepo.save(newQuestion);
        // also create interaction
        Interaction interaction = Interaction.builder()
                .user(author)
                .action(InteractionType.ASK_QUESTION)
                .question(newQuestion)
                .tags(tags)
                .build();
        interactionRepo.save(interaction);
        // increment reputation of author
        author.increaseReputation(5);

        userRepo.save(author);



        QuestionResponseDTO response = QuestionResponseDTO.builder()
                .id(savedQuestion.getId())
                .title(savedQuestion.getTitle())
                .slug(savedQuestion.getSlug())
                .explanation(savedQuestion.getExplanation())
                .tags(modelMapper.map(savedQuestion.getTags(), BasicTagInfo[].class))
                .author(modelMapper.map(savedQuestion.getAuthor(), UserBasicInfoDTO.class))
                .build();
        response.setCreatedAt(savedQuestion.getCreatedAt());
        return response;
    }

    @Override
    public PagedResponse<QuestionResponseDTO> getAllNonBannedQuestions(int pageNo, int pageSize, String sortBy, String sortOrder, String searchQuery) {
        Sort sort = Sort.by(sortBy);
        switch (sortOrder) {
            case "newest":
                sort = sort.descending();
                break;
            case "frequent":
                sort = Sort.by("views").descending();
                break;
            case "unanswered":
                // because answers is a set, -> throw unsupported operation ex
//                sort = Sort.by("answers").ascending();
//                break;
                Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
                Page<Question> questionPage = questionRepo.findAllUnansweredQuestions(pageable, searchQuery);
                return getPagedResponse(pageNo, pageSize, questionPage);
            case "recommended":
                Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                User user = null;
                    Pageable pageable1 = PageRequest.of(pageNo - 1, pageSize);
                if(principal instanceof User ) {
                    user = (User) principal;
                    Set<Tag> tags = user.getFollowedTags();
                    Page<Question> questionPage1 = questionRepo.findAllByTags( tags,pageable1);
                    return getPagedResponse(pageNo, pageSize, questionPage1);
                }else {
                    // get questions by almost popular tags
                    List<Tag> topTag = tagRepo.findTopTag(pageable1);
                    if(topTag.size() >0) {
                        Tag top1Tag = topTag.get(0);
                        Page<Question> questionPage1 = questionRepo.findAllByTagId(pageable1, top1Tag.getId(), searchQuery);
                        return getPagedResponse(pageNo, pageSize, questionPage1);
                    }else {
                        break;
                    }
                }

            default:
                sort = sort.descending();
        }

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        Page<Question> questionPage = questionRepo.findAllQuestions(pageable, searchQuery);
        return getPagedResponse(pageNo, pageSize, questionPage);
    }

    @Override
    public QuestionResponseDTO getQuestionBySlug(String slug) {
        Optional<Question> optionalQuestion = questionRepo.findBySlug(slug);
        if (optionalQuestion.isEmpty()) {
            throw new ResourceNotFoundException("Could not find any question with slug: " + slug);
        }
        Question question = optionalQuestion.get();
        question.increaseViews();
        questionRepo.save(question);
        QuestionResponseDTO response = getQuestionResponseDTO(question);
        return response;
    }

    @Override
    public PagedResponse<AnswerResponseDTO> getQuestionAnswers(Long questionId, int pageNo, int pageSize, String sortBy, String sortOrder) {
        Sort sort = Sort.by(sortBy);
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = principal instanceof User ? (User) principal : null;


//        sort = sortOrder.equals("asc") ? sort.ascending() : sort.descending();
        switch (sortOrder) {
            case "highest_upvotes": {
                Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
                Page<Answer> answerPage = answerRepo.findHighestUpvotesAnswer(questionId,pageable);
                return getPagedResponse(pageNo, pageSize, answerPage, user);
            }

            case "lowest_upvotes":
                Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
                Page<Answer> answerPage = answerRepo.findLowestUpvotesAnswer(questionId,pageable);
                return getPagedResponse(pageNo, pageSize, answerPage, user);
            case "recent":
                sort = sort.descending();
                break;
            case "old":
                sort = sort.ascending();
                break;
            default:

        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        Page<Answer> answerPage = answerRepo.findAllByQuestionId(pageable, questionId);
        return getPagedResponse(pageNo, pageSize, answerPage, user);
    }

    private PagedResponse getPagedResponse(int pageNo, int pageSize, Page<Answer> answerPage, User user) {
        List<AnswerResponseDTO> content = getPagedContent(answerPage, user);
        long totalElements = answerPage.getTotalElements();
        int totalPages = answerPage.getTotalPages();
        PagedResponse response = PagedResponse.<AnswerResponseDTO>builder()
                .metadata(content)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .pageNo(pageNo)
                .pageSize(pageSize)
                .last(answerPage.isLast())
                .build();
        return response;
    }

    private List<AnswerResponseDTO> getPagedContent(Page<Answer> answerPage, User user) {
        List<AnswerResponseDTO> content = new ArrayList<>();
        for (Answer answer : answerPage.getContent()) {
            if (answer.isDeleted() || answer.isBanned()) continue;
            AnswerResponseDTO dto = AnswerResponseDTO.builder()
                    .id(answer.getId())
                    .content(answer.getContent())
                    .author(modelMapper.map(answer.getAuthor(), UserBasicInfoDTO.class))
                    .upvotes(answer.getUpvotes().size())
                    .downvotes(answer.getDownvotes().size())
                    .upvoted(user != null && answer.getUpvotes().contains(user))
                    .downvoted(user != null && answer.getDownvotes().contains(user))
                    .build();
            dto.setCreatedAt(answer.getCreatedAt());
            content.add(dto);
        }
        return content;
    }

    @Override
    @Transactional
    public void upvoteQuestion(UpvotingQuestionRequest upvoteQuestionRequest) {
        Question question = questionRepo.findById(upvoteQuestionRequest.getQuestionId()).orElseThrow(() -> new BadRequestException("Question not found"));
        User upvoter = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (upvoteQuestionRequest.isHasupVoted()) {
            question.getUpvotes().remove(upvoter);
        } else if (upvoteQuestionRequest.isHasdownVoted()) {
            question.getUpvotes().add(upvoter);
            question.getDownvotes().remove(upvoter);
        } else {
            question.getUpvotes().add(upvoter);
        }

        // increment reputation of upvoter and author
        upvoter.increaseReputation(1);
        question.getAuthor().increaseReputation(10);

        userRepo.save(upvoter);

        questionRepo.save(question);
    }

    @Override
    @Transactional
    public void downvoteQuestion(UpvotingQuestionRequest upvoteQuestionRequest) {
        Question question = questionRepo.findById(upvoteQuestionRequest.getQuestionId()).orElseThrow(() -> new BadRequestException("Question not found"));
        User downvoter = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (upvoteQuestionRequest.isHasdownVoted()) {
            question.getDownvotes().remove(downvoter);
        } else if (upvoteQuestionRequest.isHasupVoted()) {
            question.getDownvotes().add(downvoter);
            question.getUpvotes().remove(downvoter);
        } else {
            question.getDownvotes().add(downvoter);
        }

        // decrement reputation of downvoter and author
        downvoter.decreaseReputation(1);
        question.getAuthor().decreaseReputation(10);

        userRepo.save(downvoter);

        questionRepo.save(question);
    }

    @Override
    public void saveQuestion(Long questionId) {
        Question question = questionRepo.findById(questionId).orElseThrow(() -> new BadRequestException("Question not found"));
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Set<Question> savedQuestions = user.getSavedQuestions();
        if (savedQuestions.contains(question)) {
            savedQuestions.remove(question);
        } else {
            savedQuestions.add(question);
        }
        userRepo.save(user);
    }

    @Override
    public PagedResponse<QuestionResponseDTO> getSavedQuestions(int pageNo, int pageSize, String sortBy, String sortOrder, String searchQuery) {
        Sort sort = Sort.by(sortBy);
        /*
        * most_recent
oldest
most_voted
most_viewed
most_answered
* */
        switch (sortOrder) {
            case "most_recent":
                sort = sort.descending();
                break;
            case "oldest":
                sort = sort.ascending();
                break;
            case "most_viewed":
                sort = Sort.by("views").descending();
                break;
            case "most_answered":
                Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
                Page<Question> questionPage = questionRepo.findAllMostAnsweredQuestions(pageable, searchQuery);
                return getPagedResponse(pageNo, pageSize, questionPage);
            default:
                sort = sort.descending();
        }


        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        Page<Question> questionPage = questionRepo.findAllBySavedUsers(pageable, user);
//        Set<Question> savedQuestions = user.getSavedQuestions();
        Page<Question> questionPage = questionRepo.findAllBySavedQuestions(pageable, user.getId(), searchQuery);
        List<QuestionResponseDTO> content = new ArrayList<>();
        for (Question question : questionPage.getContent()) {
            QuestionResponseDTO dto = getQuestionResponseDTO(question);
            content.add(dto);
        }
        long totalElements = questionPage.getTotalElements();
        int totalPages = questionPage.getTotalPages();
        PagedResponse<QuestionResponseDTO> response = PagedResponse.<QuestionResponseDTO>builder()
                .metadata(content)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .pageNo(pageNo)
                .pageSize(pageSize)
                .last(questionPage.isLast())
                .build();
        return response;
    }

    @Override
    public void deleteQuestion(Long questionId) {
        Question question = questionRepo.findById(questionId).orElseThrow(() -> new BadRequestException("Question not found"));
        question.setDeleted(true);
        questionRepo.save(question);
    }

    @Override
    public void updateQuestion(String slug, UpdateQuestionRequest updateQuestionRequest) {
        Question question = questionRepo.findBySlug(slug).orElseThrow(() -> new BadRequestException("Question not found"));
        question.setTitle(updateQuestionRequest.getTitle());
        question.setExplanation(updateQuestionRequest.getExplanation());
        questionRepo.save(question);
    }

    @Override
    public List<QuestionResponseDTO> getHotQuestions() {
        List<Question> hotQuestions = questionRepo.findTopQuestions();
        List<QuestionResponseDTO> response = new ArrayList<>();
        for (Question question : hotQuestions) {
            QuestionResponseDTO dto = getQuestionResponseDTO(question);
            response.add(dto);
        }
        return response;


    }

    private QuestionResponseDTO getQuestionResponseDTO(Question question) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = null;
        if (principal instanceof User) {
            user = (User) principal;

        }
        QuestionResponseDTO response = null;

        if (!question.isBanned() && !question.isDeleted()) {
            response = QuestionResponseDTO.builder()
                    .id(question.getId())
                    .title(question.getTitle())
                    .slug(question.getSlug())
                    .explanation(question.getExplanation())
                    .tags(modelMapper.map(question.getTags(), BasicTagInfo[].class))
                    .author(modelMapper.map(question.getAuthor(), UserBasicInfoDTO.class))
                    .upvotes(question.getUpvotes().size())
                    .downvotes(question.getDownvotes().size())
                    .views(question.getViews())
                    .answers(question.getAnswers().size())
                    .upvoted(user != null && question.getUpvotes().contains(user))
                    .downvoted(user != null && question.getDownvotes().contains(user))
                    .saved(user != null && user.getSavedQuestions().contains(question))
                    .build();
            response.setCreatedAt(question.getCreatedAt());
        }
        return response;
    }

    private PagedResponse getPagedResponse(int pageNo, int pageSize, Page<Question> questionPage) {
        List<QuestionResponseDTO> content = new ArrayList<>();
        for (Question question : questionPage.getContent()) {
            QuestionResponseDTO dto = getQuestionResponseDTO(question);
            content.add(dto);
        }
        long totalElements = questionPage.getTotalElements();
        int totalPages = questionPage.getTotalPages();
        PagedResponse response = PagedResponse.<QuestionResponseDTO>builder()
                .metadata(content)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .pageNo(pageNo)
                .pageSize(pageSize)
                .last(questionPage.isLast())
                .build();
        return response;
    }

    private String generateUniqueSlug(String title) {
        String slug = SlugUtils.toSlug(title);
        while (questionRepo.existsBySlug(slug)) {
            slug = SlugUtils.toSlug(title) + "-" + (int) (Math.random() * 1000);
        }
        return slug;
    }
}
