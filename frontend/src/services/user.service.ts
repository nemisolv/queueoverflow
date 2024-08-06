import { privateRequest, publicRequest } from "@/configs/axiosConfig";
import { GetAllUsersParams, GetUserByIdParams, GetUserQuestionsParams, UpdateUserParams } from "@/types/api-shared-types";

export default class UserService {
    static  getAllUsers(payload:GetAllUsersParams) {
        return  publicRequest.get("/users/public/enabled", { params: payload });
    }

    static  getUserById(data: GetUserByIdParams) {
        return  publicRequest.get(`/users/public/${data.userId}`);
    }
    static  getUserQuestions(data: GetUserQuestionsParams) {
        return  publicRequest.get(`/users/public/${data.userId}/questions`, { params: data });
    }

    static  getUserAnswers(data: GetUserQuestionsParams) {
        return  publicRequest.get(`/users/public/${data.userId}/answers`);
    }

    static updateProfile(data: UpdateUserParams) {
        return privateRequest.patch("/users/update-profile", data);
    }

    static getFullInfoOfCurrentUser() {
        return privateRequest.get("/users/me");
    }

    static changeUserAvatar(data: FormData) {
        return privateRequest.post("/upload/images/user-avatar", data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    
}

