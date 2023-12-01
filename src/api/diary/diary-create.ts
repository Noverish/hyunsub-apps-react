import { generateApi } from '../generate-api';
import diaryDetailApi from 'src/api/diary/diary-detail';
import diarySearchApi from 'src/api/diary/diary-search';
import diaryStatusMonthApi from 'src/api/diary/diary-status-month';
import { Diary } from 'src/model/diary';

export interface DiaryCreateParams {
  date: string;
  summary: string;
  content: string;
  friendIds: string[];
}

const diaryCreateApi = generateApi<DiaryCreateParams, Diary>({
  api: (params) => ({
    url: `/api/v1/diaries`,
    method: 'POST',
    data: params,
  }),
  postHandle: (result) => {
    diaryDetailApi.setCache({ date: result.date }, result);
    diarySearchApi.invalidate();
    diaryStatusMonthApi.invalidate();
  },
});

export default diaryCreateApi;
