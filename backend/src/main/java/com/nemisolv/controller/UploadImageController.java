package com.nemisolv.controller;

import com.nemisolv.entity.User;
import com.nemisolv.payload.UploadFilePayload;
import com.nemisolv.repository.UserRepository;
import com.nemisolv.service.UploadFileService;
import com.nemisolv.util.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/v1/upload")
@RequiredArgsConstructor
public class UploadImageController {

    private final UploadFileService uploadFileService;
    private final UserRepository userRepo;

    @PostMapping(value = "/images/user-avatar")
    public List<String> uploadImage(@RequestParam("files") List<MultipartFile> files,
                                    @RequestParam(value = "uploadDir", defaultValue = "/users") String uploadDir) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        uploadDir = uploadDir + "/" + user.getId();


        // before uploading new image, delete the old one
        if (user.getPicture() != null) {
            String publicId = Constants.UPLOAD_DIR_PREFIX + uploadDir + "/" + user.getPicture().substring(user.getPicture().lastIndexOf("/") + 1, user.getPicture().lastIndexOf("."));
            uploadFileService.deleteImage(publicId);
        }
        List<CompletableFuture<String>> futures = uploadFileService.uploadImages(files, Constants.UPLOAD_DIR_PREFIX + uploadDir);

        List<String> imageUrls = futures.stream().map(CompletableFuture::join).toList();
        user.setPicture(imageUrls.get(0));
        userRepo.save(user);
        return imageUrls;
    }
}