import { Album, Photo } from "src/model/photo";
import { generateQuery } from "../generate-api";

export interface AlbumDetail {
  album: Album;
  photos: Photo[];
}

export interface AlbumDetailParams {
  albumId: number;
}

const albumDetailApi = generateQuery<AlbumDetailParams, AlbumDetail>({
  api: (params) => ({
    url: `/api/v1/album/${params.albumId}`,
    method: 'GET',
  }),
  key: (params) => ['albumDetail', params.albumId.toString()],
})

export default albumDetailApi;
