import { generatePaginationQuery } from '../generate-pagination-query';
import { PhotoPreview } from 'src/model/photo';

export interface PhotoListParams {
  photoId?: string;
}

const photoListApi = generatePaginationQuery<PhotoListParams, PhotoPreview>({
  api: ({ photoId, prev, next }) => ({
    url: `/api/v1/photos`,
    method: 'GET',
    params: {
      photoId: prev || next ? undefined : photoId,
      prev,
      next,
    },
  }),
  key: 'photoListApi',
});

export default photoListApi;
