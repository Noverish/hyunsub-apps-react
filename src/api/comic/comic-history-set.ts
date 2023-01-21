import { generateApi, generateQuery } from "../generate-api";

interface ComicHistorySetParams {
  comicId: string;
  order: number;
  page: number;
}

const comicHistorySetApi = generateApi<ComicHistorySetParams, any>((params) => ({
  url: `/api/v1/comics/${params.comicId}/episodes/${params.order}/history`,
  method: `PUT`,
  data: { page: params.page },
}));

export default comicHistorySetApi;
