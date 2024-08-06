import { Schema } from 'mongoose';
import { NavigateFunction } from 'react-router-dom';
import { User } from './model-type';

// import { IUser } from "@/mongodb";

export interface LoginParams {
  email: string;
  password: string;
  navigate?: NavigateFunction;
  state?: {
    from?: {
      pathname?: string;
    };
  };
}

export interface RegisterParams extends LoginParams {
  firstName: string;
  lastName: string;
}
export interface ResetPasswordParams {
  newPassword: string;
  token: string | null;
}

export interface VerifyMfaLoginParams {
  code: string;
  email: string;
  navigate?: NavigateFunction;
}

export interface UploadUserAvatarParams {
  userId: number;
  files: FormData;
  uploadDir: string;
}

export interface CreateAnswerParams {
  content: string;
  // author: string; // User ID
  questionId: number; // Question ID
  // path: string;
}

export interface GetAnswersParams extends GetPagedResponseParams {
  questionId: number;
}

export interface AnswerVoteParams {
  answerId: number;
  hasupVoted: boolean;
  hasdownVoted: boolean;
}

export interface DeleteAnswerParams {
  answerId: string;
  path: string;
}

export interface SearchParams {
  query?: string | null;
  type?: string | null;
}

export interface RecommendedParams {
  userId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface ViewQuestionParams {
  questionId: string;
  userId: string | undefined;
}

export interface JobFilterParams {
  query: string;
  page: string;
}

export interface GetPagedResponseParams {
  pageNo?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
  searchQuery?: string;
  filter?: string;
}

export interface CreateQuestionParams {
  title: string;
  explanation: string;
  tags: string[];
  navigate: NavigateFunction;
  // author: number ;
  // path: string;
}

export interface IncreasePopularTagParams {
  tags: {
    id: number;
    name: string;
  }[];
}

export interface FollowTagParams {
  tagId: number;
}

export interface GetQuestionByIdParams {
  questionId: string;
}
export interface GetQuestionBySlugParams {
  slug: string;
}

export interface QuestionVoteParams {
  questionId: number;
  hasupVoted: boolean;
  hasdownVoted: boolean;
}

export interface DeleteQuestionParams {
  questionId: number;
}

export interface UpdateQuestionParams {
  slug?: string;
  title: string;
  explanation: string;
  navigate: NavigateFunction;
}

export interface GetAllTagsParams {
  pageNo?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
  filter?: string;
  searchQuery?: string;
}

export interface GetQuestionsByTagIdParams extends GetPagedResponseParams {
  tagId: number;
}

export interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}

export interface GetUserByIdParams {
  userId: number;
}

export interface GetAllUsersParams {
  pageNo?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}

export interface UpdateUserParams {
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
  portfolioWebsite: string;
}

export interface ToggleSaveQuestionParams {
  userId: string;
  questionId: string;
  path: string;
}

export interface GetUserQuestionsParams extends GetPagedResponseParams {
  userId: number;
}
export interface GetUserAnswerParams extends GetPagedResponseParams {
  userId: number;
}

export interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface PagedResponse<T> {
  metadata: T[];
  pageNo?: number;
  title?: string;
  pageSize?: number;
  totalElements: number;
  totalPages?: number;
  last?: boolean;
}
