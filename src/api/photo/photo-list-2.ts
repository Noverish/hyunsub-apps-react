import { generateApi } from '../generate-api';
import { Pagination } from 'src/model/api';
import { PhotoPreview } from 'src/model/photo';

export interface PhotoListParams2 {
  photoId?: string;
  prev?: string;
  next?: string;
}

const photoListApi2 = generateApi<PhotoListParams2, Pagination<PhotoPreview>>({
  api: ({ photoId, prev, next }) => ({
    url: `/api/v2/photos`,
    method: 'GET',
    params: {
      photoId: prev || next ? undefined : photoId,
      prev,
      next,
    },
  }),
});

export default photoListApi2;
