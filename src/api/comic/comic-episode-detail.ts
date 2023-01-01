import { Base64 } from 'js-base64';
import { ComicEpisodeDetail } from "src/model/comic";
import { generateQuery } from "../generate-api";

export interface ComicEpisodeDetailParams {
  name: string;
  episode: string;
}

const comicEpisodeDetailApi = generateQuery<ComicEpisodeDetailParams, ComicEpisodeDetail>({
  api: (params) => ({
    url: `/api/v1/comics/${Base64.encodeURI(params.name)}/episodes/${Base64.encodeURI(params.episode)}`,
    method: 'GET'
  }),
  key: () => 'comicEpisodeDetailApi',
});

export default comicEpisodeDetailApi;
