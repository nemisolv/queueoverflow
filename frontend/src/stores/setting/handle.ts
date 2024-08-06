import SettingService from "@/services/settting.service";
import { call, put } from "redux-saga/effects";
import { enableMFAFailure, enableMFASuccess } from "../slices/authSlice";
import { toast } from "react-toastify";

export function* handleEnableMFA({payload}: {payload: boolean}) {
    try {
        yield call(SettingService.enableMFA, payload);
        yield put(enableMFASuccess(payload));
        toast.success(`MFA ${payload ? 'enabled' : 'disabled'} successfully`);
    } catch (error) {
        yield put(enableMFAFailure());
    }
}