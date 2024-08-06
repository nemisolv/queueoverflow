package com.nemisolv.controller;

import com.nemisolv.entity.User;
import com.nemisolv.payload.ChangePasswordRequest;
import com.nemisolv.payload.ResponseMessage;
import com.nemisolv.payload.user.UpdateProfileRequest;
import com.nemisolv.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest passwordRequest, @AuthenticationPrincipal User user) {
        userService.changePassword(passwordRequest, user);
        return ResponseEntity.accepted().build();
    }

    // enable two-factor authentication
    @PatchMapping("/enable-mfa/{enabled}")
    public ResponseEntity<ResponseMessage> enableMFA(@PathVariable("enabled") boolean enabled, @AuthenticationPrincipal User user) {
        userService.enableMFA(enabled,user);
        return ResponseEntity.ok(new ResponseMessage("Switch enable mfa successfully!"));
    }


    @PatchMapping("/update-profile-picture")
    public ResponseEntity<?> updateProfilePicture(@RequestParam("file")MultipartFile file, @AuthenticationPrincipal User user) {
        userService.updateProfilePicture(file, user);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsersForAdmin() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/public/{id}/short-preview")
    public ResponseEntity<?> getShortUserPreview(@PathVariable("id") Long id) throws BadRequestException {
        return ResponseEntity.ok(userService.getUserShortPreview(id));
    }

    @GetMapping("/public/enabled")
    public ResponseEntity<?> getAllEnabledUsers(
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortOrder,
            @RequestParam(defaultValue = "") String searchQuery) {
        return ResponseEntity.ok(userService.getAllEnabledUsers(pageNo, pageSize, sortBy, sortOrder, searchQuery));

    }

    @GetMapping("/public/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getFullInfoOfCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.getFullInfoOfCurrentUser(user));
    }

    @GetMapping("/public/{userId}/questions")
    public ResponseEntity<?> getUserQuestions(@PathVariable Long userId, @RequestParam(defaultValue = "1") int pageNo,
                                             @RequestParam(defaultValue = "10") int pageSize, @RequestParam(defaultValue = "createdAt") String sortBy,
                                             @RequestParam(defaultValue = "desc") String sortOrder) {
        return ResponseEntity.ok(userService.getUserQuestions(userId, pageNo, pageSize, sortBy, sortOrder));
    }

    @GetMapping("/public/{userId}/answers")
    public ResponseEntity<?> getUserAnswers(@PathVariable Long userId, @RequestParam(defaultValue = "1") int pageNo,
                                             @RequestParam(defaultValue = "10") int pageSize, @RequestParam(defaultValue = "createdAt") String sortBy,
                                             @RequestParam(defaultValue = "desc") String sortOrder) {
        return ResponseEntity.ok(userService.getUserAnswers(userId, pageNo, pageSize, sortBy, sortOrder));
    }

    @PatchMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody UpdateProfileRequest profileRequest, @AuthenticationPrincipal User currentUser) {
        userService.updateProfile(profileRequest, currentUser);
        return ResponseEntity.noContent().build();
    }








}
