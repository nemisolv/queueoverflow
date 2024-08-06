package com.nemisolv.payload.question;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class UpdateQuestionRequest {
    @NotBlank(message = "Title is required")
    private String title;
    @Length(min = 10, message = "Content must be at least 10 characters long")
    private String explanation;
}
