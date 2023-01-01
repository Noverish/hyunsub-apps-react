import { ComicDetail } from "src/model/comic";
import { generateQuery } from "../generate-api";
import { Base64 } from 'js-base64';

export interface ComicDetailParams {
  name: string;
}

const comicDetailApi = generateQuery<ComicDetailParams, ComicDetail>({
  api: (params) => ({
    url: `/api/v1/comics/${Base64.encodeURI(params.name)}`,
    method: 'GET'
  }),
  key: () => 'comicDetailApi',
});

export default comicDetailApi;
