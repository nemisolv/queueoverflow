package com.nemisolv.service;

import com.nemisolv.entity.User;
import com.nemisolv.payload.PagedResponse;
import com.nemisolv.payload.question.QuestionResponseDTO;
import com.nemisolv.payload.tag.BasicTagInfo;
import com.nemisolv.payload.tag.CreateTagRequest;
import com.nemisolv.payload.tag.PopularTag;
import com.nemisolv.payload.tag.TagResponseDTO;
import java.util.List;

public interface TagService {

        TagResponseDTO createTag(CreateTagRequest createTagRequest);

    List<BasicTagInfo> getTopInteractedTags(User user);


    PagedResponse<TagResponseDTO> getAllTags(int pageNo, int pageSize, String sortBy, String sortOrder, String searchQuery);

    PagedResponse<QuestionResponseDTO> getTagQuestions(Long tagId, int pageNo, int pageSize, String sortBy, String sortOrder, String searchQuery);

    List<PopularTag> getPopularTags();

    void followTag(Long tagId, User user);
}
