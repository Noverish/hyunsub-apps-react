import { ComicPreview } from "src/model/comic";
import { generateQuery } from "../generate-api";

const comicListApi = generateQuery<{}, ComicPreview[]>({
  api: () => ({
    url: '/api/v1/comics',
    method: 'GET',
  }),
  key: () => 'comicListApi',
});

export default comicListApi;
