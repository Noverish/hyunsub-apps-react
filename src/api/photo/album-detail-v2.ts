import { AlbumV2 } from "src/model/photo";
import { generateQuery } from "../generate-api";

export interface AlbumDetailParams {
  albumId: string;
}

const albumDetailV2Api = generateQuery<AlbumDetailParams, AlbumV2>({
  api: (params) => ({
    url: `/api/v2/albums/${params.albumId}`,
    method: 'GET',
  }),
  key: () => 'albumDetailV2Api',
})

export default albumDetailV2Api;
