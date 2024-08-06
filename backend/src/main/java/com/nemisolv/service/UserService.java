package com.nemisolv.service;


import com.nemisolv.entity.User;
import com.nemisolv.payload.ChangePasswordRequest;
import com.nemisolv.payload.PagedResponse;
import com.nemisolv.payload.answer.AnswerResponseDTO;
import com.nemisolv.payload.question.QuestionResponseDTO;
import com.nemisolv.payload.user.*;
import org.apache.coyote.BadRequestException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    void changePassword(ChangePasswordRequest passwordRequest, User ser);
    void enableMFA(boolean enabled, User user);

    void updateProfilePicture(MultipartFile file, User user);
    List<FullUserInfoDTO> getAllUsers();

    UserBasicInfoDTO getUserShortPreview(Long id) throws BadRequestException;

    PagedResponse<UserPreviewInfo> getAllEnabledUsers(int pageNo, int pageSize, String sortBy, String sortOrder, String searchQuery);

    UserPreviewProfileDTO getUserById(Long userId);

    PagedResponse<QuestionResponseDTO> getUserQuestions(Long userId, int pageNo, int pageSize, String sortBy, String sortOrder);

    PagedResponse<AnswerResponseDTO> getUserAnswers(Long userId, int pageNo, int pageSize, String sortBy, String sortOrder);

    void updateProfile(UpdateProfileRequest profileRequest, User currentUser);

    FullUserInfoDTO getFullInfoOfCurrentUser(User currentUser);
}
