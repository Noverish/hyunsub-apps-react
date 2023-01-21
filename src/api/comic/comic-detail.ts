import { ComicDetail } from "src/model/comic";
import { generateQuery } from "../generate-api";

export interface ComicDetailParams {
  comicId: string;
}

const comicDetailApi = generateQuery<ComicDetailParams, ComicDetail>({
  api: (params) => ({
    url: `/api/v1/comics/${params.comicId}`,
    method: 'GET'
  }),
  key: () => 'comicDetailApi',
});

export default comicDetailApi;
