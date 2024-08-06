package com.nemisolv.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface UploadFileService {
    List<CompletableFuture<String>> uploadImages(List<MultipartFile> files, String uploadDir) ;
    void deleteImage(String publicId);
}