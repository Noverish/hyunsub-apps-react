import { generateQuery } from '../generate-api';
import { YoutubeFormat } from 'src/model/drive';

export interface YoutubeFormatsParams {
  url: string;
}

const youtubeFormatsApi = generateQuery<YoutubeFormatsParams, YoutubeFormat[]>({
  api: (params) => ({
    url: '/api/v1/youtube/formats',
    method: 'GET',
    params,
  }),
  key: () => 'youtubeFormatsApi',
});

export default youtubeFormatsApi;
