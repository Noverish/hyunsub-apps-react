import { generateApi } from '../generate-api';
import { Diary } from 'src/model/diary';

export interface DiaryCreateParams {
  date: string;
  summary: string;
  content: string;
}

const diaryCreateApi = generateApi<DiaryCreateParams, Diary>((params) => ({
  url: `/api/v1/diaries`,
  method: 'POST',
  data: params,
}));

export default diaryCreateApi;
