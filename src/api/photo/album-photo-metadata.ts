import { PhotoMetadata } from 'src/model/photo';
import { generateQuery } from "../generate-api";

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
