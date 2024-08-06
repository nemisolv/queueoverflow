package com.nemisolv.payload.question;

import com.nemisolv.payload.DatePayload;
import com.nemisolv.payload.tag.BasicTagInfo;
import lombok.*;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionBasicInfo extends DatePayload {
    private Long id;
    private String title;
    private String slug;


}
