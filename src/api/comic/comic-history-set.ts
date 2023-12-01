import { generateApi } from '../generate-api';

interface ComicHistorySetParams {
  comicId: string;
  order: number;
  page: number;
}

const comicHistorySetApi = generateApi<ComicHistorySetParams, any>({
  api: (params) => ({
    url: `/api/v1/comics/${params.comicId}/episodes/${params.order}/history`,
    method: `PUT`,
    data: params,
  }),
});

export default comicHistorySetApi;
