package com.nemisolv.service.impl;

import com.nemisolv.entity.Answer;
import com.nemisolv.entity.Question;
import com.nemisolv.entity.User;
import com.nemisolv.exception.BadRequestException;
import com.nemisolv.helper.UserHelper;
import com.nemisolv.payload.ChangePasswordRequest;
import com.nemisolv.payload.PagedResponse;
import com.nemisolv.payload.answer.AnswerResponseDTO;
import com.nemisolv.payload.question.QuestionBasicInfo;
import com.nemisolv.payload.question.QuestionResponseDTO;
import com.nemisolv.payload.tag.BasicTagInfo;
import com.nemisolv.payload.user.*;
import com.nemisolv.repository.AnswerRepository;
import com.nemisolv.repository.QuestionRepository;
import com.nemisolv.service.UserService;
import com.nemisolv.util.FileUploadUtils;
import jakarta.persistence.FetchType;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import com.nemisolv.repository.UserRepository;
import com.nemisolv.service.TwoFactorAuthenticationService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepo;
    private final AnswerRepository answerRepo;
    private final TwoFactorAuthenticationService tfaService;
    private final ModelMapper modelMapper;
    private final QuestionRepository questionRepo;
    private final UserHelper userHelper;
    @Override
    public void changePassword(ChangePasswordRequest passwordRequest, User user) {
         if(!passwordEncoder.matches(passwordRequest.getOldPassword(),user.getPassword())) {
             throw new IllegalStateException("Wrong password");
         }

         if(!passwordRequest.getNewPassword().equals(passwordRequest.getConfirmationPassword())) {
             throw new IllegalStateException("Passwords are not the same");
         }

         user.setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));
         userRepo.save(user);
    }

    @Override
//    @Transactional
    public void enableMFA(boolean enabled, User user) {
        if(user.getSecret()==null) {
            user.setSecret(tfaService.generateNewSecret());
        }
        user.setMfaEnabled(enabled);
        userRepo.save(user);
//        userRepo.enableMFA(user.getId(),enabled);

    }

    @Override

    public void updateProfilePicture(MultipartFile file, User user) {
        if(file.isEmpty()) {
            throw new IllegalStateException("Cannot upload empty file");
        }
            String folder = "./user-picture/" + user.getId() + "/picture";
        if(user.getPicture()!=null && !user.getPicture().isEmpty()) {
            // remove old picture
            String oldPicture = user.getPicture();
//            FileUploadUtils.deleteFile(folder,oldPicture);
            FileUploadUtils.deleteFolder(folder);
        }
            String uniqueFileName = UUID.randomUUID().toString();
            user.setPicture(StringUtils.cleanPath(uniqueFileName));
            FileUploadUtils.uploadFile(file.getOriginalFilename(), folder, file);

        userRepo.save(user);
    }

    @Override
    public List<FullUserInfoDTO> getAllUsers() {
        return userRepo.findAll().stream().map(user -> modelMapper.map(user, FullUserInfoDTO.class)).toList();
    }

    @Override
    public UserBasicInfoDTO getUserShortPreview(Long id)  {
        User user = userRepo.getUserShortPreview(id).orElseThrow(() -> new BadRequestException("User not found"));
        return modelMapper.map(user, UserBasicInfoDTO.class);
    }

    @Override
    public PagedResponse<UserPreviewInfo> getAllEnabledUsers(int pageNo, int pageSize, String sortBy, String sortOrder, String searchQuery) {
        Sort sort = Sort.by(sortBy);
        switch (sortOrder) {
            case "new_users":
                sort = sort.descending();
                break;
            case "old_users":
                sort = sort.ascending();
                break;
            case "top_contributors":
                sort = Sort.by("reputation").descending();
                break;
            default:
                sort = sort.descending();
        }

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        Page<User> userPage;
//        if(searchQuery == null || searchQuery.isEmpty()) {
             userPage = userRepo.findAllEnabledUsers(pageable,searchQuery);
//        }else {
//             userPage = userRepo.findAllEnabledUsers(pageable, searchQuery);
//        }

        List<UserPreviewInfo> content = new ArrayList<>();
        for (User user : userPage.getContent()) {
            UserPreviewInfo dto = modelMapper.map(user, UserPreviewInfo.class);
            dto.setTags(modelMapper.map(user.getFollowedTags(), BasicTagInfo[].class));
            content.add(dto);
        }
        long totalElements = userPage.getTotalElements();
        int totalPages  = userPage.getTotalPages();
        PagedResponse response = PagedResponse.<UserPreviewInfo>builder()
                .metadata(content)
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .last(userPage.isLast())
                .build();
        return response;
    }

    @Override
    public UserPreviewProfileDTO getUserById(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new BadRequestException("User not found"));
        Long upvotesOfAllQuestions = questionRepo.countUpvotesOfAllQuestion(userId);
        Long upvotesOfAllAnswers = answerRepo.countUpvotesOfAllAnswers(userId);
        Long totalQuestionsView = questionRepo.countViewsOfAllQuestion(userId);
        int totalQuestions = user.getQuestions().size();
        int totalAnswers = user.getAnswers().size();

        BadgeParam totalQuestionBadge = new BadgeParam("QUESTION_COUNT", (long)totalQuestions);
        BadgeParam totalAnswerBadge = new BadgeParam("ANSWER_COUNT",(long) totalAnswers);
        BadgeParam totalQuestionViewBadge = new BadgeParam("TOTAL_VIEWS", totalQuestionsView == null ? 0 : totalQuestionsView);
        BadgeParam totalQuestionUpvotesBadge = new BadgeParam("QUESTION_UPVOTES", upvotesOfAllQuestions);
        BadgeParam totalAnswerUpvotesBadge = new BadgeParam("ANSWER_UPVOTES", upvotesOfAllAnswers);

        List<BadgeParam> badgeParams = List.of(totalQuestionBadge, totalAnswerBadge, totalQuestionViewBadge, totalQuestionUpvotesBadge, totalAnswerUpvotesBadge);
        Map<String, Integer> badges = userHelper.assignBadges(badgeParams);

        UserPreviewProfileDTO dto = UserPreviewProfileDTO.builder()
                .id(user.getId())
                .accountName(user.getAccountName())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .portfolioWebsite(user.getPortfolioWebsite())
                .bio(user.getBio())
                .picture(user.getPicture())
                .location(user.getLocation())
                .reputation(user.getReputation())
                .createdAt(user.getCreatedAt())
                .totalQuestions(totalQuestions)
                .totalAnswers(totalAnswers)
                .badgeCounts(badges)

                .build();

        return dto;
    }

    @Override
    public PagedResponse<QuestionResponseDTO> getUserQuestions(Long userId, int pageNo, int pageSize, String sortBy, String sortOrder) {
//        User user = userRepo.findById(userId).orElseThrow(() -> new BadRequestException("User not found"));
        Sort sort = Sort.by(sortBy);
        sort = sortOrder.equals("asc") ? sort.ascending() : sort.descending();
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        Page<Question> questionPage = questionRepo.findAllByAuthorId(userId, pageable);
        List<QuestionResponseDTO> content = new ArrayList<>();
        for(Question question : questionPage.getContent()) {
            if(question.isDeleted() || question.isBanned()) {
                continue;
            }
            QuestionResponseDTO dto = QuestionResponseDTO.builder()
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
                    .build();
            dto.setCreatedAt(question.getCreatedAt());
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

    @Override
    public PagedResponse<AnswerResponseDTO> getUserAnswers(Long userId, int pageNo, int pageSize, String sortBy, String sortOrder) {
        Sort sort = Sort.by(sortBy);
        sort = sortOrder.equals("asc") ? sort.ascending() : sort.descending();
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        Page<Answer> answerPage = answerRepo.findAllByAuthorId(pageable,userId);
        List<AnswerResponseDTO> content = new ArrayList<>();
        for(Answer answer : answerPage.getContent()) {
            if(answer.isDeleted() || answer.isBanned()) {
                continue;
            }
            AnswerResponseDTO dto = AnswerResponseDTO.builder()
                    .id(answer.getId())
                    .content(answer.getContent())
                    .author(modelMapper.map(answer.getAuthor(), UserBasicInfoDTO.class))
                    .upvotes(answer.getUpvotes().size())
                    .downvotes(answer.getDownvotes().size())
                    .question(modelMapper.map(answer.getQuestion(), QuestionBasicInfo.class))
                    .build();
            dto.setCreatedAt(answer.getCreatedAt());
            content.add(dto);
        }
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

    @Override
    public void updateProfile(UpdateProfileRequest profileRequest, User currentUser) {
        currentUser.setFirstName(profileRequest.getFirstName());
        currentUser.setLastName(profileRequest.getLastName());
        currentUser.setBio(profileRequest.getBio());
        currentUser.setLocation(profileRequest.getLocation());
        currentUser.setPortfolioWebsite(profileRequest.getPortfolioWebsite());
        userRepo.save(currentUser);
    }

    @Override
    @Fetch(FetchMode.SELECT)
    public FullUserInfoDTO getFullInfoOfCurrentUser(User currentUser) {
        return modelMapper.map(currentUser, FullUserInfoDTO.class);
    }

}
