import { generateQuery } from '../generate-api';
import { PageData } from 'src/model/api';
import { DiaryPreview } from 'src/model/diary';

export interface DiarySearchParams {
  page?: number;
  query?: string;
}

const diarySearchApi = generateQuery<DiarySearchParams, PageData<DiaryPreview>>({
  api: (params) => ({
    url: `/api/v1/search`,
    method: 'POST',
    data: params,
  }),
  key: 'diarySearchApi',
});

export default diarySearchApi;
