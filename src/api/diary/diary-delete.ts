import diaryDetailApi from './diary-detail';
import diarySearchApi from 'src/api/diary/diary-search';
import diaryStatusMonthApi from 'src/api/diary/diary-status-month';
import { generateApi } from 'src/api/generate-api';
import { Diary } from 'src/model/diary';

export interface DiaryDeleteParams {
  date: string;
}

const diaryDeleteApi = generateApi<DiaryDeleteParams, Diary>({
  api: ({ date }) => ({
    url: `/api/v1/diaries/${date}`,
    method: 'DELETE',
  }),
  postHandle: (result) => {
    diaryDetailApi.setCache({ date: result.date }, null);
    diarySearchApi.clearCache();
    diaryStatusMonthApi.invalidate();
  },
});

export default diaryDeleteApi;
