import { generateQuery } from '../generate-api';
import { PageData } from 'src/model/api';
import { Diary } from 'src/model/diary';

export interface DiarySearchParams {
  page?: number;
  query?: string;
}

const diarySearchApi = generateQuery<DiarySearchParams, PageData<Diary>>({
  api: (params) => ({
    url: `/api/v1/search`,
    method: 'POST',
    data: params,
  }),
  key: () => 'diarySearchApi',
});

export default diarySearchApi;
