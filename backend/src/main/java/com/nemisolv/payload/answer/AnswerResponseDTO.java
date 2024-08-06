package com.nemisolv.payload.answer;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nemisolv.payload.DatePayload;
import com.nemisolv.payload.question.QuestionBasicInfo;
import com.nemisolv.payload.user.UserBasicInfoDTO;
import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AnswerResponseDTO extends DatePayload {
    private Long id;
    private String content;
    private UserBasicInfoDTO author;
    private QuestionBasicInfo question;
    //    private BasicTagInfo[] tags;
    private int upvotes;
    private int downvotes;
    private boolean upvoted;
    private boolean downvoted;


}
