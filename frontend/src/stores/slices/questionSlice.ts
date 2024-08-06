//@ts-nocheck
import {
  AnswerVoteParams,
  CreateAnswerParams,
  CreateQuestionParams,
  DeleteQuestionParams,
  GetPagedResponseParams,
  GetQuestionsByTagIdParams,
  PagedResponse,
  QuestionVoteParams,
  UpdateQuestionParams,
} from './../../types/api-shared-types.d';
import { GetAnswersParams } from '@/types/api-shared-types';
import { Answer, Question } from '@/types/model-type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface QuestionState {
  questions: PagedResponse<Question>;
  currentQuestion: Question;
  answersByQuestion: PagedResponse<Answer>;
  savedQuestions: PagedResponse<Question>;
  questionsByTag: PagedResponse<Question>;
  hotQuestions: Question[];
  loading: boolean;
}

const initialState: QuestionState = {
  questions: { metadata: [] ,totalElements:0},
  questionsByTag: { metadata: [], totalElements:0 },
  currentQuestion: {
    id: 0,
    title: '',
    explanation: '',
    saved: false,
    views: 0,
    answers: 0,
    slug: '',
    author: { id: 0, firstName: '', lastName: '', picture: '' },
    tags: [],
    createdAt: '',
    upvotes: 0,
    downvotes: 0,
    upvoted: false,
    downvoted: false,
  },
  hotQuestions: [],
  answersByQuestion: { metadata: [], totalElements: 0 },
  savedQuestions: { metadata: [], totalElements:0 },
  loading: false,
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    fetchQuestions: (state, action: PayloadAction<GetPagedResponseParams>) => {
      state.loading = true;
    },
    fetchQuestionsSuccess: (state, action) => {
      state.questions = action.payload;
      state.loading = false;
    },
    fetchQuestionsFailure: (state) => {
      state.loading = false;
    },

    fetchAnswersByQuestion: (
      state,
      action: PayloadAction<GetAnswersParams>,
    ) => {
      state.loading = true;
    },
    fetchAnswersByQuestionSuccess: (state, action) => {
      state.answersByQuestion = action.payload;
      state.loading = false;
    },

    fetchAnswersByQuestionFailure: (state) => {
      state.loading = false;
    },
    createAnswer: (state, action: PayloadAction<CreateAnswerParams>) => {
      state.loading = true;
    },
    createAnswerSuccess: (state, action) => {
      state.answersByQuestion.metadata?.unshift(action.payload);
      state.answersByQuestion.totalElements = state.answersByQuestion
        ?.totalElements
        ? state.answersByQuestion?.totalElements + 1
        : 1;
      state.loading = false;
    },
    createAnswerFailure: (state) => {
      state.loading = false;
    },

    createQuestion: (state, action: PayloadAction<CreateQuestionParams>) => {
      state.loading = true;
    },
    createQuestionSuccess: (state, action) => {
      if (Array.isArray(state.questions.metadata)) {
        state.questions.metadata = [];
      }
      state.questions.metadata.unshift(action.payload);
      state.hotQuestions.push(action.payload);
      state.loading = false;
    },
    createQuestionFailure: (state) => {
      state.loading = false;
    },

    deleteQuestion: (state, action: PayloadAction<DeleteQuestionParams>) => {
      state.loading = true;
    },
    deleteQuestionSuccess: (state, action: PayloadAction<DeleteQuestionParams>) => {
      const {questionId} = action.payload;
      state.questions.metadata = state.questions.metadata.filter(
        (question) => question.id !== questionId,
      );

      state.questionsByTag.metadata = state.questionsByTag.metadata.filter(
        (question) => question.id !== questionId,
      );
      state.savedQuestions.metadata = state.savedQuestions.metadata.filter(
        (question) => question.id !== questionId,
      );

      state.loading = false;
    },
    deleteQuestionFailure: (state) => {
      state.loading = false;
    },

    updateQuestion: (state, action: PayloadAction<UpdateQuestionParams>) => {
      state.loading = true;
    },
    updateQuestionSuccess: (state, action) => {
      const {title,explanation} = action.payload;
      const index = state.questions.metadata.findIndex(
        (question) => question.id === action.payload.id,
      );
      if (index !== -1) {
        state.questions.metadata[index].title = title;
        state.questions.metadata[index].explanation = explanation;
      }
      state.loading = false;
    },
    updateQuestionFailure: (state) => {
      state.loading = false;
    },

    fetchQuestionBySlug: (state, action: PayloadAction<string | undefined>) => {
      state.loading = true;
    },
    fetchQuestionBySlugSuccess: (state, action) => {
      state.currentQuestion = action.payload;
      state.loading = false;
    },

    fetchQuestionBySlugFailure: (state) => {
      state.loading = false;
      state.currentQuestion = initialState.currentQuestion;
    },

    upvoteQuestion: (state, action: PayloadAction<QuestionVoteParams>) => {
      state.loading = true;
    },
    upvoteQuestionSuccess: (
      state,
      action: PayloadAction<QuestionVoteParams>,
    ) => {
      const { hasdownVoted, hasupVoted } = action.payload;
      if (hasupVoted) {
        state.currentQuestion.upvotes -= 1;
        state.currentQuestion.upvoted = false;
      } else if (hasdownVoted) {
        state.currentQuestion.downvotes -= 1;
        state.currentQuestion.upvotes += 1;
        state.currentQuestion.upvoted = true;
        state.currentQuestion.downvoted = false;
      } else {
        state.currentQuestion.upvotes += 1;
        state.currentQuestion.upvoted = true;
      }
      state.loading = false;
    },

    upvoteQuestionFailure: (state) => {
      state.loading = false;
    },
    downvoteQuestion: (state, action: PayloadAction<QuestionVoteParams>) => {
      state.loading = true;
    },
    downvoteQuestionSuccess: (
      state,
      action: PayloadAction<QuestionVoteParams>,
    ) => {
      const { hasdownVoted, hasupVoted } = action.payload;
      if (hasdownVoted) {
        state.currentQuestion.downvotes -= 1;
        state.currentQuestion.downvoted = false;
      } else if (hasupVoted) {
        state.currentQuestion.upvotes -= 1;
        state.currentQuestion.downvotes += 1;
        state.currentQuestion.downvoted = true;
        state.currentQuestion.upvoted = false;
      } else {
        state.currentQuestion.downvotes += 1;
        state.currentQuestion.downvoted = true;
      }
      state.loading = false;
    },

    downvoteQuestionFailure: (state) => {
      state.loading = false;
    },

    //  upvote answer section
    upvoteAnswer: (state, action: PayloadAction<AnswerVoteParams>) => {
      state.loading = true;
    },
    upvoteAnswerSuccess: (state, action: PayloadAction<AnswerVoteParams>) => {
      const { hasdownVoted, hasupVoted } = action.payload;
      const index = state.answersByQuestion.metadata.findIndex(
        (answer) => answer.id === action.payload.answerId,
      );
      if (hasupVoted) {
        state.answersByQuestion.metadata[index].upvotes -= 1;
        state.answersByQuestion.metadata[index].upvoted = false;
      } else if (hasdownVoted) {
        state.answersByQuestion.metadata[index].downvotes -= 1;
        state.answersByQuestion.metadata[index].upvotes += 1;
        state.answersByQuestion.metadata[index].upvoted = true;
        state.answersByQuestion.metadata[index].downvoted = false;
      } else {
        state.answersByQuestion.metadata[index].upvotes += 1;
        state.answersByQuestion.metadata[index].upvoted = true;
      }
      state.loading = false
    },

    upvoteAnswerFailure: (state) => {
      state.loading = false;
    },

    // downvote answer section
    downvoteAnswer: (state, action: PayloadAction<AnswerVoteParams>) => {
      state.loading = true;
    },
    downvoteAnswerSuccess: (state, action: PayloadAction<AnswerVoteParams>) => {
      const { hasdownVoted, hasupVoted } = action.payload;
      const index = state.answersByQuestion.metadata.findIndex(
        (answer) => answer.id === action.payload.answerId,
      );
      if (hasdownVoted) {
        state.answersByQuestion.metadata[index].downvotes -= 1;
        state.answersByQuestion.metadata[index].downvoted = false;
      } else if (hasupVoted) {
        state.answersByQuestion.metadata[index].upvotes -= 1;
        state.answersByQuestion.metadata[index].downvotes += 1;
        state.answersByQuestion.metadata[index].downvoted = true;
        state.answersByQuestion.metadata[index].upvoted = false;
      } else {
        state.answersByQuestion.metadata[index].downvotes += 1;
        state.answersByQuestion.metadata[index].downvoted = true;
      }
      state.loading = false;
    },

    downvoteAnswerFailure: (state) => {
      state.loading = false;
    },
    fetchSavedQuestions: (
      state,
      action: PayloadAction<GetPagedResponseParams>,
    ) => {
      state.loading = true;
    },
    fetchSavedQuestionsSuccess: (state, action) => {
      state.savedQuestions = action.payload;
      state.loading = false;
    },
    fetchSavedQuestionsFailure: (state) => {
      state.loading = false;
    },
    toggleSaveQuestion: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    toggleSaveQuestionSuccess: (state) => {
      state.loading = false;
      state.currentQuestion.saved = !state.currentQuestion.saved;
    },
    toggleSaveQuestionFailure: (state) => {
      state.loading = false;
    },
    fetchQuestionsByTag: (
      state,
      action: PayloadAction<GetQuestionsByTagIdParams>,
    ) => {
      state.loading = true;
    },
    fetchQuestionsByTagSuccess: (state, action) => {
      state.questionsByTag = action.payload;
      state.loading = false;
    },
    fetchQuestionsByTagFailure: (state) => {
      state.loading = false;
    },

    fetchTop10HotQuestions: (state) => {
      state.loading = true;
    },
    fetchTop10HotQuestionsSuccess: (state, action) => {
      state.hotQuestions = action.payload;
      state.loading = false;
    },
    fetchTop10HotQuestionsFailure: (state) => {
      state.loading = false;
    },

  },
});

export const {
  fetchQuestions,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  fetchQuestionBySlug,
  fetchQuestionBySlugSuccess,
  fetchQuestionBySlugFailure,
  fetchAnswersByQuestion,
  fetchAnswersByQuestionSuccess,
  fetchAnswersByQuestionFailure,
  createQuestion,
  createQuestionSuccess,
  createQuestionFailure,
  deleteQuestion,
  deleteQuestionSuccess,
  deleteQuestionFailure,
  updateQuestion,
  updateQuestionSuccess,
  updateQuestionFailure,
  createAnswer,
  createAnswerSuccess,
  createAnswerFailure,
  upvoteQuestion,
  upvoteQuestionSuccess,
  upvoteQuestionFailure,
  downvoteQuestion,
  downvoteQuestionSuccess,
  downvoteQuestionFailure,
  upvoteAnswer,
  upvoteAnswerSuccess,
  upvoteAnswerFailure,
  downvoteAnswer,
  downvoteAnswerSuccess,
  downvoteAnswerFailure,
  fetchSavedQuestions,
  fetchSavedQuestionsSuccess,
  fetchSavedQuestionsFailure,
  toggleSaveQuestion,
  toggleSaveQuestionSuccess,
  toggleSaveQuestionFailure,
  fetchQuestionsByTag,
  fetchQuestionsByTagSuccess,
  fetchQuestionsByTagFailure,
  fetchTop10HotQuestions,
  fetchTop10HotQuestionsSuccess,
  fetchTop10HotQuestionsFailure,

  
} = questionSlice.actions;

export default questionSlice.reducer;
