import { takeLatest } from 'redux-saga/effects';
import {
  createAnswer,
  createQuestion,
  deleteQuestion,
  downvoteAnswer,
  downvoteQuestion,
  fetchAnswersByQuestion,
  fetchQuestionBySlug,
  fetchQuestions,
  fetchQuestionsByTag,
  fetchSavedQuestions,
  fetchTop10HotQuestions,
  toggleSaveQuestion,
  updateQuestion,
  upvoteAnswer,
  upvoteQuestion,
} from '../slices/questionSlice';
import {
  handleCreateAnswer,
  handleCreateQuestion,
  handleDeleteQuestion,
  handleDownvoteAnswer,
  handleDownvoteQuestion,
  handleFetchAnswersQuestion,
  handleFetchQuestionBySlug,
  handleFetchQuestions,
  handleFetchQuestionsByTag,
  handleFetchSavedQuestions,
  handleFetchTop10HotQuestions,
  handleSaveQuestion,
  handleUpdateQuestion,
  handleUpvoteAnswer,
  handleUpvoteQuestion,
} from './handle';

export default function* questionSaga() {
  yield takeLatest<any>(createQuestion.type, handleCreateQuestion);
  yield takeLatest<any>(fetchQuestions.type, handleFetchQuestions);
  yield takeLatest<any>(fetchQuestionBySlug.type, handleFetchQuestionBySlug);
  yield takeLatest<any>(
    fetchAnswersByQuestion.type,
    handleFetchAnswersQuestion,
  );
  yield takeLatest<any>(createAnswer.type, handleCreateAnswer);
  yield takeLatest<any>(upvoteQuestion.type, handleUpvoteQuestion);
  yield takeLatest<any>(downvoteQuestion.type, handleDownvoteQuestion);
  yield takeLatest<any>(upvoteAnswer.type,handleUpvoteAnswer);
  yield takeLatest<any>(downvoteAnswer.type,handleDownvoteAnswer);
  yield takeLatest<any>(fetchSavedQuestions.type, handleFetchSavedQuestions);
  yield takeLatest<any>(toggleSaveQuestion.type, handleSaveQuestion);
  yield takeLatest<any>(fetchQuestionsByTag, handleFetchQuestionsByTag)
  yield takeLatest<any>(deleteQuestion.type, handleDeleteQuestion);
  yield takeLatest<any>(updateQuestion.type, handleUpdateQuestion);
  yield takeLatest<any>(fetchTop10HotQuestions.type, handleFetchTop10HotQuestions)
}
