import TagService from "@/services/tag.service";
import { FollowTagParams, GetPagedResponseParams } from "@/types/api-shared-types";
import { call, put } from "redux-saga/effects";
import { fetchAllTagsSuccess, fetchTop10PopularTagsFailure, fetchTop10PopularTagsSuccess, followTagFailure, followTagSuccess } from "../slices/tagSlice";
import { SagaIterator } from "redux-saga";

export function* handleFetchAllTags({payload}: {payload: GetPagedResponseParams}): SagaIterator {
    try {
        const response = yield call(TagService.getAllTags, payload);
        console.log(response);
        yield put(fetchAllTagsSuccess(response.data));
    }catch(error) {
        console.log("🚀 ~ function*handleFetchAllTags ~ error:", error)
    }
}

export function* handleGetPopularTags(): SagaIterator {
    try {
        const response = yield call(TagService.getPopularTags);
        console.log(response);
        yield put(fetchTop10PopularTagsSuccess(response.data));
    }catch(error) {
        yield put(fetchTop10PopularTagsFailure());
    }
}

export function* handleFollowTag({payload}: {payload: FollowTagParams}) {
    try {
        yield call(TagService.followTag, payload.tagId);
        yield put(followTagSuccess(payload.tagId));
    }catch(error) {
        yield put(followTagFailure());
        console.log("🚀 ~ function*handleFollowTag ~ error:", error)
    }
}