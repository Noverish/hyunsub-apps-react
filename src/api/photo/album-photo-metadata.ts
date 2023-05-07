import { generateQuery } from '../generate-api';
import { PhotoMetadata } from 'src/model/photo';

export interface AlbumPhotoMetadataParams {
  albumId: string;
}

const albumPhotoMetadataApi = generateQuery<AlbumPhotoMetadataParams, PhotoMetadata[]>({
  api: (params) => ({
    url: `/api/v2/albums/${params.albumId}/photos/metadata`,
    method: 'GET',
  }),
  key: () => 'albumPhotoMetadataApi',
});

export default albumPhotoMetadataApi;
