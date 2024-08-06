package com.nemisolv.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Slf4j
public class FileUploadUtils {

    public static void uploadFile(String fileName, String folderUpload, MultipartFile file) {
        Path path = Paths.get(folderUpload);
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                log.error("ErrorDTO creating directory: " + path);
                e.printStackTrace();
            }
        }

        try (InputStream fis = file.getInputStream();) {
            Path filePath = path.resolve(fileName);
            Files.copy(fis, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            log.error("ErrorDTO uploading file: {}", fileName);
            e.printStackTrace();

        }
    }

    public static void uploadMultipleFiles(String folderUpload, MultipartFile[] files) {
        for (MultipartFile file : files) {
            uploadFile(file.getOriginalFilename(), folderUpload, file);
        }
    }

    public static void deleteFile(String folderUpload, String fileName) {
        Path path = Paths.get(folderUpload +"/"+ fileName);
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            log.error("ErrorDTO deleting file: {}", fileName);
            e.printStackTrace();
        }
    }

    public static void clearFolder(String folderUpload) {
        Path path = Paths.get(folderUpload);
        try {
            Files.list(path).forEach(p -> {
                try {
                    Files.deleteIfExists(p);
                } catch (IOException e) {
                    log.error("ErrorDTO deleting file: {}", p.getFileName());
                    e.printStackTrace();
                }
            });
        } catch (IOException e) {
            log.error("ErrorDTO clearing folder: {}", folderUpload);
            e.printStackTrace();
        }
    }

    public static void deleteFolder(String folderUpload) {
        Path path = Paths.get(folderUpload);
        try {
            Files.list(path).forEach(p -> {
                try {
                    // delete all files in the folder
                    Files.deleteIfExists(p);
                } catch (IOException e) {
                    log.error("ErrorDTO deleting file: {}", p.getFileName());
                    e.printStackTrace();
                }
            });
            // delete the folder
            Files.deleteIfExists(path);
        } catch (IOException e) {
            log.error("ErrorDTO deleting folder: {}", folderUpload);
            e.printStackTrace();

        }
    }

}
