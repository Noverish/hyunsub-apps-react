import { Photo } from "src/model/photo";
import { generateQuery } from "../generate-api";

export interface PhotoDetailParams {
  photoId: number;
}

const photoDetailApi = generateQuery<PhotoDetailParams, Photo>({
  api: (params) => ({
    url: `/api/v1/photos/${params.photoId}`,
    method: 'GET',
  }),
  key: () => 'photoDetail',
})

export default photoDetailApi;
