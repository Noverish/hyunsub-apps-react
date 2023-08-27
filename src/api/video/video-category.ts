import { generateQuery } from 'src/api/generate-api';
import { VideoCategory } from 'src/model/video';

const videoCategoryApi = generateQuery<{}, VideoCategory[]>({
  api: () => ({
    url: '/api/v1/categories',
    method: 'GET',
  }),
  key: 'videoCategoryApi',
});

export default videoCategoryApi;
