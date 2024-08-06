import QuestionService from '@/services/question.service';
import {
  AnswerVoteParams,
  CreateAnswerParams,
  CreateQuestionParams,
  DeleteQuestionParams,
  UpdateQuestionParams,
  GetAnswersParams,
  GetPagedResponseParams,
  GetQuestionBySlugParams,
  QuestionVoteParams,
  GetQuestionsByTagIdParams,
} from '@/types/api-shared-types';
import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  createAnswerFailure,
  createAnswerSuccess,
  createQuestionFailure,
  createQuestionSuccess,
  deleteQuestionFailure,
  deleteQuestionSuccess,
  downvoteAnswerFailure,
  downvoteAnswerSuccess,
  downvoteQuestionFailure,
  downvoteQuestionSuccess,
  fetchAnswersByQuestionFailure,
  fetchAnswersByQuestionSuccess,
  fetchQuestionBySlugFailure,
  fetchQuestionBySlugSuccess,
  fetchQuestionsByTagFailure,
  fetchQuestionsByTagSuccess,
  fetchQuestionsFailure,
  fetchQuestionsSuccess,
  fetchSavedQuestionsFailure,
  fetchSavedQuestionsSuccess,
  fetchTop10HotQuestionsFailure,
  fetchTop10HotQuestionsSuccess,
  toggleSaveQuestionFailure,
  toggleSaveQuestionSuccess,
  updateQuestionFailure,
  updateQuestionSuccess,
  upvoteAnswerFailure,
  upvoteAnswerSuccess,
  upvoteQuestionFailure,
  upvoteQuestionSuccess,
} from '../slices/questionSlice';
import { toast } from 'react-toastify';
import AnswerService from '@/services/answer.service';
import TagService from '@/services/tag.service';
import { increaseTotalQuestionsNumOfPopularTag } from '../slices/tagSlice';

export function* handleCreateQuestion({
  payload,
}: {
  payload: CreateQuestionParams;
}): SagaIterator {
  try {
    const { navigate } = payload;
    const response = yield call(QuestionService.createQuestion, payload);
    yield put(createQuestionSuccess(response.data));
    const { tags } = response.data;
    yield put(increaseTotalQuestionsNumOfPopularTag({ tags }));
    navigate('/');
    toast.success('Question created successfully');
  } catch (error: any) {
    console.log('🚀 ~ function*handleCreateQuestion ~ error:', error);
    toast.error(error.response.data.message);
    yield put(createQuestionFailure());
  }
}

export function* handleFetchQuestions({
  payload,
}: {
  payload: GetPagedResponseParams;
}): SagaIterator {
  try {
    const response = yield call(QuestionService.fetchQuestions, payload);
    yield put(fetchQuestionsSuccess(response.data));
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message);
    yield put(fetchQuestionsFailure());
  }
}

export function* handleFetchQuestionBySlug({
  payload,
}: {
  payload: GetQuestionBySlugParams;
}): SagaIterator {
  try {
    const response = yield call(QuestionService.fetchQuestionBySlug, payload);
    yield put(fetchQuestionBySlugSuccess(response.data));
  } catch (error: any) {
    console.log(error);
    // toast.error(error.response.data.message);
    yield put(fetchQuestionBySlugFailure());
  }
}

export function* handleFetchAnswersQuestion({
  payload,
}: {
  payload: GetAnswersParams;
}): SagaIterator {
  try {
    const response = yield call(
      QuestionService.fetchAnswersByQuestion,
      payload,
    );
    yield put(fetchAnswersByQuestionSuccess(response.data));
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message);
    yield put(fetchAnswersByQuestionFailure());
  }
}

export function* handleCreateAnswer({
  payload,
}: {
  payload: CreateAnswerParams;
}): SagaIterator {
  try {
    const response = yield call(QuestionService.createAnswer, payload);

    yield put(createAnswerSuccess(response.data));
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message);

    yield put(createAnswerFailure());
  }
}

export function* handleUpvoteQuestion({
  payload,
}: {
  payload: QuestionVoteParams;
}) {
  try {
    yield call(QuestionService.upvote, payload);
    yield put(upvoteQuestionSuccess(payload));
  } catch (error: any) {
    toast.error(error.response.data.message);
    yield put(upvoteQuestionFailure());
  }
}

export function* handleDownvoteQuestion({
  payload,
}: {
  payload: QuestionVoteParams;
}) {
  try {
    yield call(QuestionService.downvote, payload);
    yield put(downvoteQuestionSuccess(payload));
  } catch (error: any) {
    toast.error(error.response.data.message);
    yield put(downvoteQuestionFailure());
  }
}

export function* handleUpvoteAnswer({
  payload,
}: {
  payload: AnswerVoteParams;
}) {
  try {
    yield call(AnswerService.upvote, payload);
    yield put(upvoteAnswerSuccess(payload));
  } catch (error: any) {
    toast.error(error.response.data.message);
    yield put(upvoteAnswerFailure());
  }
}

export function* handleDownvoteAnswer({
  payload,
}: {
  payload: AnswerVoteParams;
}) {
  try {
    yield call(AnswerService.downvote, payload);
    yield put(downvoteAnswerSuccess(payload));
  } catch (error: any) {
    toast.error(error.response.data.message);
    yield put(downvoteAnswerFailure());
  }
}

export function* handleFetchSavedQuestions({
  payload,
}: {
  payload: GetPagedResponseParams;
}): SagaIterator {
  try {
    const response = yield call(QuestionService.fetchSavedQuestions, payload);
    yield put(fetchSavedQuestionsSuccess(response.data));
  } catch (error: any) {
    toast.error(error.response.data.message);
    yield put(fetchSavedQuestionsFailure());
  }
}

export function* handleSaveQuestion({ payload }: { payload: number }) {
  try {
    yield call(QuestionService.saveQuestion, payload);
    yield put(toggleSaveQuestionSuccess());
  } catch (error: any) {
    toast.error(error.response.data.message);
    yield put(toggleSaveQuestionFailure());
  }
}

export function* handleFetchQuestionsByTag({
  payload,
}: {
  payload: GetQuestionsByTagIdParams;
}): SagaIterator {
  try {
    const response = yield call(TagService.getQuestionsByTag, payload);
    yield put(fetchQuestionsByTagSuccess(response.data));
  } catch (error: any) {
    toast.error(error.response.data.message);
    yield put(fetchQuestionsByTagFailure());
  }
}
export function* handleDeleteQuestion({
  payload
}:{payload: DeleteQuestionParams}) {
  try {
    yield call(QuestionService.deleteQuestion, payload);
    yield put(deleteQuestionSuccess(payload));
  } catch (error: any) {
    toast.error(error.response.data.message);
    yield put(deleteQuestionFailure());
  }
}

export function* handleUpdateQuestion({
  payload,
}: {
  payload: UpdateQuestionParams;
}) {
  try {
    const { navigate } = payload;
    yield call(QuestionService.updateQuestion, payload);
    yield put(updateQuestionSuccess(payload));
    navigate('/');
  } catch (error: any) {
    toast.error(error.response.data.message);
    yield put(updateQuestionFailure());
  }
}

export function* handleFetchTop10HotQuestions(): SagaIterator {
  try {
    const response = yield call(QuestionService.findTop10HotQuestions);
    yield put(fetchTop10HotQuestionsSuccess(response.data));
  } catch (error: any) {
    toast.error(error.response.data.message);
    yield put(fetchTop10HotQuestionsFailure());
  }
}

