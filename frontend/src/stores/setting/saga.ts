import { takeLatest } from "redux-saga/effects";
import { enableMFA } from "../slices/authSlice";
import { handleEnableMFA } from "./handle";

export default function* settingSaga() {
    yield takeLatest<any>(enableMFA.type, handleEnableMFA);
}