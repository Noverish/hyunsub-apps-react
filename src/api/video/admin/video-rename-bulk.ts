import { generateApi } from "src/api/generate-api";

export interface VideoRenameBulkParams {
  videoIds: string[];
  from: string;
  to: string;
  isRegex: boolean;
}

const videoRenameBulkApi = generateApi<VideoRenameBulkParams, any>(params => ({
  url: `/api/v1/rename/bulk`,
  method: 'POST',
  data: params,
}));

export default videoRenameBulkApi;
