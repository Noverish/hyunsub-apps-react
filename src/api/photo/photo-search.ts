import { generateInfiniteQuery } from '../generate-infinite-query';
import { DateRange } from 'src/model/api';
import { PhotoPreview } from 'src/model/photo';

export interface PhotoSearchParams {
  dateRange?: DateRange;
  photoId?: string;
  orphan?: boolean;
}

const photoSearchApi = generateInfiniteQuery<PhotoSearchParams, PhotoPreview>({
  api: (params) => ({
    url: `/api/v1/search/photos`,
    method: 'POST',
    data: {
      ...params,
      photoId: params.page !== undefined ? undefined : params.photoId,
    },
  }),
  key: 'photoSearchApi',
});

export default photoSearchApi;
