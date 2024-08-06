
//@ts-nocheck
import {
  GetPagedResponseParams,
  GetUserAnswerParams,
  GetUserByIdParams,
  GetUserQuestionsParams,
  PagedResponse,
} from '@/types/api-shared-types';
import { Answer, PreviewUserProfile, Question, User } from '@/types/model-type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCurrentUserId } from './authSlice';

interface UserState {
  previewUserProfile: PreviewUserProfile;
  users: PagedResponse<User>;
  userQuestions: PagedResponse<Question>;
  userAnswers: PagedResponse<Answer>;
  loading: boolean;
}

const initialState: UserState = {
  previewUserProfile: {
    id: 0,
    firstName: '',
    lastName: '',
    accountName: '',
    email: '',
    portfolioWebsite: '',
    location: '',
    picture: '',
    bio: '',
    createdAt: new Date(),
    updatedAt: '',
    reputation: 0,
    totalQuestions: 0,
    totalAnswers: 0,
    badgeCounts: {
      BRONZE: 0,
      SILVER: 0,
      GOLD: 0,
    },
  },
  users: { metadata: [] , totalElements:0},
  userQuestions: { metadata: [] , totalElements:0 },
  userAnswers: { metadata: [] , totalElements:0 },
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    

    fetchUsers: (state, action: PayloadAction<GetPagedResponseParams>) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
    },
    fetchUserProfile: (state, action: PayloadAction<GetUserByIdParams>) => {
      state.loading = true;
    },
    fetchUserProfileSuccess: (state, action) => {
      state.loading = false;
      state.previewUserProfile = action.payload;
    },
    fetchUserProfileFailure: (state) => {
      state.loading = false;
    },

    fetchUserQuestions: (
      state,
      action: PayloadAction<GetUserQuestionsParams>,
    ) => {
      // state.loading = true;
    },
    fetchUserQuestionsSuccess: (state, action) => {
      state.userQuestions = action.payload;
      state.loading = false;
    },
    fetchUserQuestionsFailure: (state) => {
      state.loading = false;
    },
    fetchUserAnswers: (state, action: PayloadAction<GetUserAnswerParams>) => {
      // state.loading = true;
    },
    fetchUserAnswersSuccess: (state, action) => {
      state.userAnswers = action.payload;
      state.loading = false;
    },
    fetchUserAnswersFailure: (state) => {
      state.loading = false;
    },
    updatePreviewUserInfo: state => {
      state.loading = true;
    },
    updatePreviewUserInfoSuccess: (state, action) => {
      state.previewUserProfile = {...state.previewUserProfile, ...action.payload};
      state.loading = false;
    },
    updatePreviewUserAvatar: (state, action) => {
      // const userId = getCurrentUserId(state);
      // console.log("🚀 ~ userId:", userId)
      console.log('action.payload:::', action.payload)
      const {userId, picture} = action.payload
      if (+userId === state.previewUserProfile.id) {
        state.previewUserProfile.picture = picture;
    }
  },
}
  
});

export const {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserProfile,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
  fetchUserQuestions,
  fetchUserQuestionsSuccess,
  fetchUserQuestionsFailure,
  fetchUserAnswers,
  fetchUserAnswersSuccess,
  fetchUserAnswersFailure,
  updatePreviewUserInfo,
  updatePreviewUserInfoSuccess,
  updatePreviewUserAvatar
} = userSlice.actions;



export default userSlice.reducer;


