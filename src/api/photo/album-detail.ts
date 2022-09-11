import { Album } from "src/model/photo";
import { generateQuery } from "../generate-api";

export interface AlbumDetailParams {
  albumId: number;
}

const albumDetailApi = generateQuery<AlbumDetailParams, Album>({
  api: (params) => ({
    url: `/api/v1/album/${params.albumId}`,
    method: 'GET',
  }),
  key: () => 'albumDetail',
})

export default albumDetailApi;
