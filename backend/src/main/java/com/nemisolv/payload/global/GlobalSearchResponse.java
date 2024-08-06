package com.nemisolv.payload.global;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder

@JsonInclude(JsonInclude.Include.NON_NULL)
public class GlobalSearchResponse {
    private Long id;
    private String title;
    private String slug;
    private String type;

    public GlobalSearchResponse(Long id, String title, String slug, String type) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.type = type;
    }

    public GlobalSearchResponse(Long id, String title, String type) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.slug = null;
    }
}
