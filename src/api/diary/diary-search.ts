import { generateInfiniteQuery } from '../generate-infinite-query';
import { Diary } from 'src/model/diary';

export interface DiarySearchParams {
  query: string;
}

const diarySearchApi = generateInfiniteQuery<DiarySearchParams, Diary>({
  api: (params) => ({
    url: `/api/v1/search`,
    method: 'POST',
    data: params,
  }),
  key: () => 'diarySearchApi',
});

export default diarySearchApi;
