package com.nemisolv.service.impl;

import com.nemisolv.entity.Question;
import com.nemisolv.entity.Tag;
import com.nemisolv.entity.User;
import com.nemisolv.exception.BadRequestException;
import com.nemisolv.payload.PagedResponse;
import com.nemisolv.payload.question.QuestionResponseDTO;
import com.nemisolv.payload.tag.BasicTagInfo;
import com.nemisolv.payload.tag.CreateTagRequest;
import com.nemisolv.payload.tag.PopularTag;
import com.nemisolv.payload.tag.TagResponseDTO;
import com.nemisolv.payload.user.UserBasicInfoDTO;
import com.nemisolv.repository.InteractionRepository;
import com.nemisolv.repository.QuestionRepository;
import com.nemisolv.repository.TagRepository;
import com.nemisolv.service.TagService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TagServiceImpl  implements TagService {
    private final TagRepository tagRepo;
    private final QuestionRepository questionRepo;
    private final ModelMapper modelMapper;
    private final InteractionRepository interactionRepo;
    @Override
    public TagResponseDTO createTag(CreateTagRequest createTagRequest) {
        // check if tag already exists
        tagRepo.findByNameIgnoreCase(createTagRequest.getName()).ifPresent(tag -> {
            throw new BadRequestException("Tag already exists");
        });

        // create tag
        Tag newTag = Tag.builder()
                .name(createTagRequest.getName())
                .description(createTagRequest.getDescription())
                .build();
        Tag savedTag = tagRepo.save(newTag);
        return modelMapper.map(savedTag, TagResponseDTO.class);
    }

    @Override
    public List<BasicTagInfo> getTopInteractedTags(User user) {
        Pageable pageable = PageRequest.of(1,3);
        Set<Tag> tags = interactionRepo.findTagsInteractedByUser(user.getId());
        List<BasicTagInfo> tagInfos = tags.stream().map(tag -> modelMapper.map(tag, BasicTagInfo.class)).toList();
        return tagInfos;




//        return List.of(
//                new BasicTagInfo(1L, "JAVA"),
//                new BasicTagInfo(4L, "JPA")
//        );

    }

    @Override
    public PagedResponse<TagResponseDTO> getAllTags(int pageNo, int pageSize, String sortBy, String sortOrder, String searchQuery) {
        Sort sort = Sort.by(sortBy);
        /*
        * popular
recent
name
old*/
        switch (sortOrder) {
            case "popular":
                Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
                Page<Tag> tagPage = tagRepo.findAllMostQuestionsTag(pageable,searchQuery);
                return getPagedResponse(pageNo, pageSize, tagPage);
            case "recent":
                sort = sort.descending();
                break;
            case "name":
                sort = Sort.by("name").ascending();
                break;
            case "old":
                sort = sort.ascending();
                break;
        }
        Pageable pageable = PageRequest.of(pageNo -1, pageSize, sort);
        Page<Tag> tagPage = tagRepo.findAllTags(pageable, searchQuery);
        return getPagedResponse(pageNo, pageSize, tagPage);
    }

    @Override
    public PagedResponse<QuestionResponseDTO> getTagQuestions(Long tagId, int pageNo, int pageSize, String sortBy, String sortOrder, String searchQuery) {
        Sort sort = Sort.by(sortBy);
        sort = sortOrder.equals("asc") ? sort.ascending() : sort.descending();
        Pageable pageable = PageRequest.of(pageNo -1, pageSize, sort);
        Tag tag = tagRepo.findById(tagId).orElseThrow(() -> new BadRequestException("Tag not found"));
//        Set<Question> questionsByTag = tag.getQuestions();
        Page<Question> questionPage = questionRepo.findAllByTagId(pageable, tagId, searchQuery);
//        if(searchQuery !=null && !searchQuery.isEmpty()) {
//            questionsByTag = questionsByTag.stream().map(q -> {
//
//            })
//        }
//        long totalElements = questionsByTag.size();
//        int totalPages = (int) Math.ceil(totalElements / pageSize);
        List<QuestionResponseDTO> content = new ArrayList<>();
        for(Question question : questionPage.getContent()) {
            QuestionResponseDTO dto = QuestionResponseDTO.builder()
                    .id(question.getId())
                    .title(question.getTitle())
                    .slug(question.getSlug())
                    .explanation(question.getExplanation())
                    .tags(modelMapper.map(question.getTags(), BasicTagInfo[].class))
                    .author(modelMapper.map(question.getAuthor(), UserBasicInfoDTO.class))
                    .upvotes(question.getUpvotes().size())
                    .downvotes(question.getDownvotes().size())
                    .views(question.getViews())
                    .answers(question.getAnswers().size())

                    .build();
            dto.setCreatedAt(question.getCreatedAt());
            content.add(dto);
        }
        PagedResponse response = PagedResponse.<QuestionResponseDTO>builder()
                .metadata(content)
                .title(tag.getName())
                .totalElements(questionPage.getTotalElements())
                .totalPages(questionPage.getTotalPages())
                .pageNo(pageNo)
                .pageSize(pageSize)
                .last(questionPage.isLast())
                .build();
        return response;
    }

    @Override
    public List<PopularTag> getPopularTags() {
        List<Tag> tags = tagRepo.findPopularTags();
        List<PopularTag> popularTags = new ArrayList<>();
        for(Tag tag : tags) {
            PopularTag tagInfo = new PopularTag(tag.getId(), tag.getName(), tag.getQuestions().size());
            popularTags.add(tagInfo);
        }
        return popularTags;
    }

    @Override
    public void followTag(Long tagId, User user) {
        Tag tag = tagRepo.findById(tagId).orElseThrow(() -> new BadRequestException("Tag not found"));
        if(tag.getFollowers().contains(user)) {
            tag.getFollowers().remove(user);
        }else {
            tag.getFollowers().add(user);
        }
        tagRepo.save(tag);
    }

    private PagedResponse getPagedResponse(int pageNo, int pageSize, Page<Tag> tagPage) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = null;
        if(principal!=null && principal instanceof User) {
            user = (User) principal;
        }

        List<TagResponseDTO> content = new ArrayList<>();
        for(Tag tag : tagPage.getContent()) {
            TagResponseDTO dto = modelMapper.map(tag, TagResponseDTO.class);
            dto.setQuestionCount(tag.getQuestions().size());
            dto.setFollowerCount(tag.getFollowers().size());
            dto.setFollowing(user !=null  && tag.getFollowers().contains( user));
            content.add(dto);
        }
        long totalElements = tagPage.getTotalElements();
        int totalPages = tagPage.getTotalPages();
        PagedResponse response = PagedResponse.<TagResponseDTO>builder()
                .metadata(content)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .pageNo(pageNo)
                .pageSize(pageSize)
                .last(tagPage.isLast())
                .build();
        return response;
    }
}
