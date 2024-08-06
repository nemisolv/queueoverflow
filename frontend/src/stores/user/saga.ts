import { takeLatest } from "redux-saga/effects";
import { fetchUserAnswers, fetchUserProfile, fetchUserQuestions, fetchUsers } from '../slices/userSlice';
import { handleFetchPreviewUserProfile, handleFetchUserAnswers, handleFetchUserQuestions, handleFetchUsers } from "./handle";

function* userSaga() {
    yield takeLatest<any>(fetchUsers.type, handleFetchUsers);
    yield takeLatest<any>(fetchUserProfile.type,handleFetchPreviewUserProfile);
    yield takeLatest<any>(fetchUserQuestions.type, handleFetchUserQuestions);
    yield takeLatest<any>(fetchUserAnswers.type, handleFetchUserAnswers);
}

export default userSaga;