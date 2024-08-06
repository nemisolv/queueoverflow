import { takeLatest } from "redux-saga/effects";
import { fetchAllTags, fetchTop10PopularTags, followTag } from "../slices/tagSlice";
import { handleFetchAllTags, handleFollowTag, handleGetPopularTags } from "./handle";

export default function* tagSaga() {
    yield takeLatest<any>(fetchAllTags.type, handleFetchAllTags);
    yield takeLatest<any>(fetchTop10PopularTags.type, handleGetPopularTags);
    yield takeLatest<any>(followTag.type, handleFollowTag);
}