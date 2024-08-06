package com.nemisolv.payload.question;

import com.nemisolv.payload.DatePayload;
import com.nemisolv.payload.tag.BasicTagInfo;
import com.nemisolv.payload.user.UserBasicInfoDTO;
import lombok.*;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionResponseDTO extends DatePayload {
    private Long id;
    private String title;
    private String explanation;
    private String slug;
    private BasicTagInfo[] tags;

    private UserBasicInfoDTO author;
    private int upvotes;
    private int downvotes;
    private int views;
    private int answers;
    private boolean upvoted;
    private boolean downvoted;
    private boolean saved;

}
