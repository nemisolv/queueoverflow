package com.nemisolv.payload;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class UploadFilePayload {
    private String uploadDir;
    private List<MultipartFile> files;

}
