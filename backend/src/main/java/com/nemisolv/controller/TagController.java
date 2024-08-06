package com.nemisolv.controller;

import com.nemisolv.entity.User;
import com.nemisolv.payload.ChangePasswordRequest;
import com.nemisolv.payload.ResponseMessage;
import com.nemisolv.payload.tag.CreateTagRequest;
import com.nemisolv.service.TagService;
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
@RequestMapping("/api/v1/tags")
public class TagController {
    private final TagService tagService;

    @PostMapping
    public ResponseEntity<?> createTag(@RequestBody CreateTagRequest createTagRequest) {
        tagService.createTag(createTagRequest);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/public/all")

    public ResponseEntity<?> getAllTags(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "10") int pageSize,
                                        @RequestParam(defaultValue = "createdAt") String sortBy, @RequestParam(defaultValue = "desc") String sortOrder,
                                        @RequestParam(defaultValue = "") String searchQuery) {
        return ResponseEntity.ok(tagService.getAllTags(pageNo, pageSize, sortBy, sortOrder, searchQuery));
    }


    // get top interacted tags
    @GetMapping("/public/top-interacted")
    public ResponseEntity<?> getTopInteractedTags(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(tagService.getTopInteractedTags(user));
    }
    @GetMapping("/public/{tagId}/questions")
    public ResponseEntity<?> getTagQuestions(@PathVariable Long tagId, @RequestParam(defaultValue = "1") int pageNo,
                                            @RequestParam(defaultValue = "10") int pageSize, @RequestParam(defaultValue = "createdAt") String sortBy,
                                            @RequestParam(defaultValue = "desc") String sortOrder,
                                             @RequestParam(defaultValue = "") String searchQuery){
        return ResponseEntity.ok(tagService.getTagQuestions(tagId, pageNo, pageSize, sortBy, sortOrder, searchQuery));
    }

    @GetMapping("/public/popular")
    public ResponseEntity<?> getPopularTags() {
        return ResponseEntity.ok(tagService.getPopularTags());
    }

    @PostMapping("/{tagId}/follow")
    public ResponseEntity<?> followTag(@PathVariable Long tagId, @AuthenticationPrincipal User user) {
        tagService.followTag(tagId, user);
        return ResponseEntity.accepted().build();
    }


}
