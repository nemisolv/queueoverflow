//@ts-nocheck
import { Tag } from '@/types/model-type';
import { GetPagedResponseParams, IncreasePopularTagParams, PagedResponse, FollowTagParams } from './../../types/api-shared-types.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TagState = {
  tags:  PagedResponse<Tag>; 
  popularTags: {
    id: number;
    name: string;
    totalQuestions: number;
  }[];

  loading: boolean;
};

const initialState: TagState = {
  tags: {metadata: [], totalElements:0},
  loading: false,
  popularTags: [],
};

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    fetchAllTags: (state, action:PayloadAction<GetPagedResponseParams>) => {
      state.loading = true;
    },
    fetchAllTagsSuccess: (state, action) => {
      state.tags = action.payload;
      state.loading = false;
    },
    fetchAllTagsFailure: (state) => {
      state.loading = false;
    },
    fetchTop10PopularTags: (state) => {
      state.loading = true;
    },
    fetchTop10PopularTagsSuccess: (state, action) => {
      state.popularTags = action.payload;
      state.loading = false;
    },
    fetchTop10PopularTagsFailure: (state) => {
      state.loading = false;
    },

    // when creating new question, I need to increase totalQuestions
    increaseTotalQuestionsNumOfPopularTag: (
      state,
      action: PayloadAction<IncreasePopularTagParams>,
    ) => {
      const { tags } = action.payload;
      console.log("🚀 ~ tags:", tags)

      tags.forEach((tag) => {
        const popularTag = state.popularTags.find(
          (popuTag) => popuTag.name === tag.name,
        );
        if (popularTag) {
          popularTag.totalQuestions++;
        } else {
          // If the tag is not found in popularTags, add it with a totalQuestions count of 1
          state.popularTags.push({
            id: tag.id,
            name: tag.name,
            totalQuestions: 1,
          });
        }
      });
    },

    followTag: (state, action: PayloadAction<FollowTagParams>) => {
      // state.loading = true;
    } ,
    followTagSuccess: (state,action: PayloadAction<number>) => {
      state.loading = false;
      const tagId = action.payload;
      const tag = state.tags.metadata.find((tag) => tag.id === tagId);

      if(tag) {
        tag.following = !tag.following;
      }

    },

    followTagFailure: (state) => {
      state.loading = false;
    }
  },
});

export const {
  fetchAllTags,
  fetchAllTagsSuccess,
  fetchAllTagsFailure,
  fetchTop10PopularTags,
  fetchTop10PopularTagsSuccess,
  fetchTop10PopularTagsFailure,
  increaseTotalQuestionsNumOfPopularTag,
  followTag,
  followTagSuccess,
  followTagFailure,
} = tagSlice.actions;
export default tagSlice.reducer;
