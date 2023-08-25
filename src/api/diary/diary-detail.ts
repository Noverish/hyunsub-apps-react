import { generateQuery } from 'src/api/generate-api';
import { Diary } from 'src/model/diary';

export interface DiaryDetailParams {
  date: string;
}

const diaryDetailApi = generateQuery<DiaryDetailParams, Diary | null>({
  api: ({ date }) => ({
    url: `/api/v1/diaries/${date}`,
    method: 'GET',
  }),
  key: () => 'diaryDetailApi',
});

export default diaryDetailApi;
