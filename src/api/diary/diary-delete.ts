import { generateApi } from 'src/api/generate-api';
import { Diary } from 'src/model/diary';

export interface DiaryDeleteParams {
  date: string;
}

const diaryDeleteApi = generateApi<DiaryDeleteParams, Diary>(({ date }) => ({
  url: `/api/v1/diaries/${date}`,
  method: 'DELETE',
}));

export default diaryDeleteApi;
