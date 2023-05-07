import { generateQuery } from '../generate-api';
import { ComicPreview } from 'src/model/comic';

const comicListApi = generateQuery<{}, ComicPreview[]>({
  api: () => ({
    url: '/api/v1/comics',
    method: 'GET',
  }),
  key: () => 'comicListApi',
});

export default comicListApi;
