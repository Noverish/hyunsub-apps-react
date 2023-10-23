import { generateApi } from 'src/api/generate-api';
import { Diary } from 'src/model/diary';

export interface DiaryUpdateParams {
  date: string;
  summary: string;
  content: string;
  friendIds: string[];
}

const diaryUpdateApi = generateApi<DiaryUpdateParams, Diary>((params) => ({
  url: `/api/v1/diaries/${params.date}`,
  method: 'PUT',
  data: params,
}));

export default diaryUpdateApi;
