import { generateInfiniteQuery2 } from '../generate-infinite-query-2';
import { PhotoPreview } from 'src/model/photo';

export interface PhotoListParams {
  photoId?: string;
}

const photoListApi = generateInfiniteQuery2<PhotoListParams, PhotoPreview>({
  api: ({ photoId, prev, next }) => ({
    url: `/api/v2/photos`,
    method: 'GET',
    params: {
      photoId: prev || next ? undefined : photoId,
      prev,
      next,
    },
  }),
  key: () => 'photoListApi',
});

export default photoListApi;
