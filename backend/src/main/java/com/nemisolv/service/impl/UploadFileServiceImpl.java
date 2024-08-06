package com.nemisolv.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.nemisolv.exception.UploadFileProcessException;
import com.nemisolv.service.UploadFileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@Slf4j

public class UploadFileServiceImpl implements UploadFileService {
    private final Cloudinary cloudinary;

    @Override
    public List<CompletableFuture<String>> uploadImages(List<MultipartFile> files, String uploadDir) {
        return files.stream()
                .map(file -> CompletableFuture.supplyAsync(() -> {
                    try {
                        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                                ObjectUtils.asMap("resource_type", "auto", "folder", uploadDir));
                        return (String) uploadResult.get("url");
                    } catch (Exception e) {
                        log.error("Error occurred while uploading file", e);
                        throw new UploadFileProcessException("Error occurred while uploading file");
                    }
                }))
                .toList();
    }

    @Override
    public void deleteImage(String publicId) {
        try {
            Map destroyed = cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("invalidate", true));
            log.info("Image deleted successfully: {}", destroyed);
        } catch (Exception e) {
            log.error("Error occurred while deleting file", e);
            throw new UploadFileProcessException("Error occurred while deleting file");
        }
    }


}