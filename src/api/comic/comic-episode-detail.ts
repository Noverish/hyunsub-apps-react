import { ComicEpisodeDetail } from "src/model/comic";
import { generateQuery } from "../generate-api";

export interface ComicEpisodeDetailParams {
  comicId: string;
  order: number;
}

const comicEpisodeDetailApi = generateQuery<ComicEpisodeDetailParams, ComicEpisodeDetail>({
  api: (params) => ({
    url: `/api/v1/comics/${params.comicId}/episodes/${params.order}`,
    method: 'GET'
  }),
  key: () => 'comicEpisodeDetailApi',
});

export default comicEpisodeDetailApi;
