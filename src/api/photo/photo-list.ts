import { PhotoPreview } from "src/model/photo";
import { generateInfiniteQuery } from "../generate-api";

export interface PhotoListParams {

}

const photoListApi = generateInfiniteQuery<PhotoListParams, PhotoPreview>({
  api: (params) => ({
    url: `/api/v2/photos`,
    method: 'GET',
    params: {
      p: params.page,
    }
  }),
  key: () => 'photoListApi',
});

export default photoListApi;
