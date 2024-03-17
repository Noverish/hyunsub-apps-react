import { generateInfiniteQuery } from '../generate-infinite-query';
import { DateRange } from 'src/model/api';
import { PhotoPreview } from 'src/model/photo';

export interface PhotoSearchParams {
  dateRange?: DateRange;
}

const photoSearchApi = generateInfiniteQuery<PhotoSearchParams, PhotoPreview>({
  api: (data) => ({
    url: `/api/v1/search/photos`,
    method: 'POST',
    data,
  }),
  key: 'photoSearchApi',
});

export default photoSearchApi;
