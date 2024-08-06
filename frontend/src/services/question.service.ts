import { privateRequest, publicRequest } from '@/configs/axiosConfig';
import {
  CreateAnswerParams,
  CreateQuestionParams,
  DeleteQuestionParams,
  UpdateQuestionParams,
  GetAnswersParams,
  GetQuestionBySlugParams,
  QuestionVoteParams,
  GetPagedResponseParams,
} from '@/types/api-shared-types';
import { Answer, Question } from '@/types/model-type';
import { getToken } from '@/utils/authUtils';

class QuestionService {
  static createQuestion(data: CreateQuestionParams) {
    return privateRequest.post('/questions', data);
  }
  static fetchQuestions(params: GetPagedResponseParams) {
    return publicRequest.get('/questions', { params });
  }
  static fetchAnswersByQuestion(param: GetAnswersParams) {
    const { accessToken } = getToken();
    if (accessToken) {
      return privateRequest.get(
        `/questions/public/${param.questionId}/answers`,
        {
          params: param,
        },
      );
    } else
      return publicRequest.get(
        `/questions/public/${param.questionId}/answers`,
        {
          params: param,
        },
      );
  }
  static fetchQuestionBySlug(slug: GetQuestionBySlugParams): Promise<Question> {
    const { accessToken } = getToken();
    if (accessToken) {
      return privateRequest.get(`/questions/public/${slug}`);
    } else return publicRequest.get(`/questions/public/${slug}`);
  }

  static deleteQuestion(data: DeleteQuestionParams): Promise<any> {
    return privateRequest.delete(`/questions/${data.questionId}`);
  }

  static updateQuestion(data: UpdateQuestionParams) {
    return privateRequest.patch(`/questions/${data.slug}`, data);
  }
  static createAnswer(data: CreateAnswerParams): Promise<Answer> {
    return privateRequest.post('/answers', data);
  }

  static upvote(data: QuestionVoteParams) {
    return privateRequest.post(`/questions/upvote`, data);
  }

  static downvote(data: QuestionVoteParams) {
    return privateRequest.post(`/questions/downvote`, data);
  }

  static fetchSavedQuestions(params: GetPagedResponseParams) {
    return privateRequest.get('/questions/saved', {params});
  }

  static saveQuestion(id: number) {
    return privateRequest.post(`/questions/${id}/save`);
  }

  static findTop10HotQuestions() {
    return publicRequest.get('/questions/public/hot');
  }
}

export default QuestionService;
