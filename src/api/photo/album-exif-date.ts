import { PageData } from "src/model/api";
import { PhotoExifDate } from 'src/model/photo';
import { generateQuery } from "../generate-api";

export interface AlbumPhotosParams {
  albumId: number;
  page: number;
}

const albumExifDateApi = generateQuery<AlbumPhotosParams, PageData<PhotoExifDate>>({
  api: (params) => ({
    url: `/api/v1/albums/${params.albumId}/exif/date`,
    method: 'GET',
    params: {
      p: params.page,
    }
  }),
  key: () => 'albumExifDate',
})

export default albumExifDateApi;
