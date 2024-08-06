package com.nemisolv.payload.tag;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTagRequest {
    @NotBlank(message = "Tag's name is required")
    private String name;
    private String description;

    public CreateTagRequest(String name) {
        this.name = name;
    }
}
