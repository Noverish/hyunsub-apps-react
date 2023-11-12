import { generateInfiniteQuery } from '../generate-infinite-query';
import { PhotoPreview } from 'src/model/photo';

export interface DiaryDetailPhotosParams {
  date: string;
}

const diaryDetailPhotosApi = generateInfiniteQuery<DiaryDetailPhotosParams, PhotoPreview>({
  api: ({ date, ...params }) => ({
    url: `/api/v1/diaries/${date}/photos`,
    method: 'GET',
    params,
  }),
  key: 'diaryDetailPhotosApi',
});

export default diaryDetailPhotosApi;
