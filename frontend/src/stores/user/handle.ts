
import UserService from "@/services/user.service";
import {  SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { fetchUserAnswersFailure, fetchUserAnswersSuccess, fetchUserProfileFailure, fetchUserProfileSuccess, fetchUserQuestionsFailure, fetchUserQuestionsSuccess, fetchUsersSuccess } from "../slices/userSlice";
import { GetAllUsersParams, GetUserAnswerParams, GetUserByIdParams, GetUserQuestionsParams } from "@/types/api-shared-types";




export function* handleFetchUsers({payload}: {payload: GetAllUsersParams}): SagaIterator {
    try {
        
        const response = yield call(UserService.getAllUsers, payload);
        yield put(fetchUsersSuccess(response.data))
    }catch(error) {
        console.log("🚀 ~ function*handleFetchUsers ~ error:", error)
        // yield 
    }
}

export function* handleFetchPreviewUserProfile({payload}: {payload: GetUserByIdParams}): SagaIterator {
    try {
        const response = yield call(UserService.getUserById, payload);
        yield put(fetchUserProfileSuccess(response.data));
    }catch(error) {
        console.log("🚀 ~ function*handleFetchPreviewUserProfile ~ error:", error)
        yield put(fetchUserProfileFailure())
    }
}

export function* handleFetchUserQuestions({payload}: {payload: GetUserQuestionsParams}) : SagaIterator {
    console.log("🚀 ~ function*handleFetchUserQuestions ~ payload:", payload)
    try {
        const response = yield call(UserService.getUserQuestions, payload);
        yield put(fetchUserQuestionsSuccess(response.data));
    }catch(error) {
        console.log("🚀 ~ function*handleFetchUserQuestions ~ error:", error)
        yield put(fetchUserQuestionsFailure())
    }
}

export function* handleFetchUserAnswers({payload}: {payload: GetUserAnswerParams}): SagaIterator {
    try {
        const response = yield call(UserService.getUserAnswers, payload);
        yield put(fetchUserAnswersSuccess(response.data));
    }catch(error) {
        console.log("🚀 ~ function*handleFetchUserAnswers ~ error:", error)
        yield put(fetchUserAnswersFailure());
        
    }
}




