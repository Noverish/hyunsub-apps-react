import { generateInfiniteQuery } from '../generate-infinite-query';
import { DiaryPreview } from 'src/model/diary';

export interface DiarySearchParams {
  query?: string;
}

const diarySearchApi = generateInfiniteQuery<DiarySearchParams, DiaryPreview>({
  api: (params) => ({
    url: `/api/v1/search`,
    method: 'POST',
    data: params,
  }),
  key: 'diarySearchApi',
});

export default diarySearchApi;
