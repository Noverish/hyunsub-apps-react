import { generateQuery } from '../generate-api';
import { Album } from 'src/model/photo';

export interface AlbumDetailParams {
  albumId: string;
}

const albumDetailApi = generateQuery<AlbumDetailParams, Album>({
  api: (params) => ({
    url: `/api/v2/albums/${params.albumId}`,
    method: 'GET',
  }),
  key: 'albumDetailApi',
});

export default albumDetailApi;
