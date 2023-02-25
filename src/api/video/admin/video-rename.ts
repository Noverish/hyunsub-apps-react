import { generateApi } from "src/api/generate-api";

export interface VideoRenameParams {
  videoId: string;
  from: string;
  to: string;
  isRegex: boolean;
}

const videoRename = generateApi<VideoRenameParams, any>(params => ({
  url: `/api/v1/rename`,
  method: 'POST',
  data: params,
}));

export default videoRename;
