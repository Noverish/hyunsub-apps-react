import { generateInfiniteQuery } from '../generate-api';
import { AlbumPreview } from 'src/model/photo';

const albumListApi = generateInfiniteQuery<{}, AlbumPreview>({
  api: () => ({
    url: '/api/v2/albums',
    method: 'GET',
  }),
  key: () => 'albumListApi',
});

export default albumListApi;
