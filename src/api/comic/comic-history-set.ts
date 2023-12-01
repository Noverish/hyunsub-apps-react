import { generateApi } from '../generate-api';
import comicDetailApi from './comic-detail';
import comicEpisodeDetailApi from './comic-episode-detail';
import { SimpleResponse } from 'src/model/api';
import { ComicDetail, ComicEpisodeDetail } from 'src/model/comic';

interface ComicHistorySetParams {
  comicId: string;
  order: number;
  page: number;
}

const comicHistorySetApi = generateApi<ComicHistorySetParams, SimpleResponse>({
  api: (params) => ({
    url: `/api/v1/comics/${params.comicId}/episodes/${params.order}/history`,
    method: `PUT`,
    data: params,
  }),
  postHandle: (result, { comicId, order, page }) => {
    comicDetailApi.updateCache({ comicId }, (cache: ComicDetail) => {
      cache.episodes.filter((v) => v.order === order)[0].history = page;
    });
    comicEpisodeDetailApi.updateCache({ comicId, order }, (cache: ComicEpisodeDetail) => {
      cache.history = page;
    });
  },
});

export default comicHistorySetApi;
