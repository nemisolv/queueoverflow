import { privateRequest } from "@/configs/axiosConfig";

export default class SettingService {
    static async enableMFA(mfaEnabled: boolean) {
        return privateRequest.patch(`/users/enable-mfa/${mfaEnabled}`)
    }
}