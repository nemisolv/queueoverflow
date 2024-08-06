package com.nemisolv.helper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OpenAIRequest {
    private final String model = "davinci-codex";
    private final String prompt;
    private final int max_tokens = 150;

    public OpenAIRequest(String prompt) {
        this.prompt = prompt;
    }

    // getters
}