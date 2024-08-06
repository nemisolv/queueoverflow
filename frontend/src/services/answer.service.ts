import { privateRequest } from "@/configs/axiosConfig";
import { AnswerVoteParams } from "@/types/api-shared-types";

class AnswerService {
    static upvote(data: AnswerVoteParams)  {
        return privateRequest.post(`/answers/upvote`, data);
      }
    
      static downvote(data: AnswerVoteParams) {
        return privateRequest.post(`/answers/downvote`, data);
      }

      static generateAIAnswer(question: string) {
        return privateRequest.post('/answers/chatgpt/generate-ai-answer', {questionContent: question})
      }
}

export default AnswerService;