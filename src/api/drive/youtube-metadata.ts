import { generateQuery } from '../generate-api';
import { YoutubeMetadata } from 'src/model/drive';

export interface YoutubeMetadataParams {
  url: string;
}

const youtubeMetadataApi = generateQuery<YoutubeMetadataParams, YoutubeMetadata>({
  api: (params) => ({
    url: '/api/v1/youtube/metadata',
    method: 'GET',
    params,
  }),
  key: 'youtubeMetadataApi',
});

export default youtubeMetadataApi;
