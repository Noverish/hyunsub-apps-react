import { generateInfiniteQuery } from '../generate-infinite-query';
import { AlbumPreview } from 'src/model/photo';

const albumListApi = generateInfiniteQuery<{}, AlbumPreview>({
  api: () => ({
    url: '/api/v2/albums',
    method: 'GET',
  }),
  key: () => 'albumListApi',
});

export default albumListApi;
