import diaryDetailApi from './diary-detail';
import diarySearchApi from './diary-search';
import diaryStatusMonthApi from './diary-status-month';
import { generateApi2 } from 'src/api/generate-api';
import { Diary } from 'src/model/diary';

export interface DiaryUpdateParams {
  date: string;
  summary: string;
  content: string;
  friendIds: string[];
}

const diaryUpdateApi = generateApi2<DiaryUpdateParams, Diary>({
  api: (params) => ({
    url: `/api/v1/diaries/${params.date}`,
    method: 'PUT',
    data: params,
  }),
  postHandle: (result) => {
    diaryDetailApi.setCache({ date: result.date }, result);
    diarySearchApi.clearCache();
    diaryStatusMonthApi.invalidate();
  },
});

export default diaryUpdateApi;
