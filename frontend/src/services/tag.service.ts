import { privateRequest, publicRequest } from "@/configs/axiosConfig";
import {  GetPagedResponseParams, GetQuestionsByTagIdParams } from "@/types/api-shared-types";
import { getToken } from "@/utils/authUtils";

export default class TagService {
    static  getTopInteractedTags() {
        return  publicRequest.get('/tags/public/top-interacted');
    }

    static  getAllTags(params: GetPagedResponseParams) {
        const { accessToken } = getToken();
        if(accessToken) {
            return privateRequest.get('/tags/public/all', { params });
        }        

        return  publicRequest.get('/tags/public/all', { params });
    }
    static  getQuestionsByTag(params : GetQuestionsByTagIdParams) {
        return  publicRequest.get(`/tags/public/${params.tagId}/questions`, { params });
    }

    static  getPopularTags() {
        return  publicRequest.get('/tags/public/popular');
    }

    static followTag(tagId: number) {
        return privateRequest.post(`/tags/${tagId}/follow`);
    }
}