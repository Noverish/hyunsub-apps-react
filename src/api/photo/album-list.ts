import { generateInfiniteQuery } from '../generate-infinite-query';
import { AlbumPreview } from 'src/model/photo';

const albumListApi = generateInfiniteQuery<{}, AlbumPreview>({
  api: ({ page }) => ({
    url: '/api/v2/albums',
    method: 'GET',
    params: { p: page },
  }),
  key: 'albumListApi',
});

export default albumListApi;
