import { PageData } from "src/model/api";
import { PhotoDate } from 'src/model/photo';
import { generateQuery } from "../generate-api";

export interface AlbumDateParams {
  albumId: number;
  page: number;
}

const albumDateApi = generateQuery<AlbumDateParams, PageData<PhotoDate>>({
  api: (params) => ({
    url: `/api/v1/albums/${params.albumId}/photos/date`,
    method: 'GET',
    params: {
      p: params.page,
    }
  }),
  key: () => 'albumDate',
})

export default albumDateApi;
