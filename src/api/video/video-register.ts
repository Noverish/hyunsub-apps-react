import { generateApi } from "src/api/generate-api";

export interface VideoRegisterParams {
  category: string;
  videoPath: string;
  outputPath: string;
  videoGroupId?: string;
  newGroupName?: string;
  thumbnailUrl?: string;
}

const videoRegister = generateApi<VideoRegisterParams, any>(params => ({
  url: `/api/v1/video`,
  method: 'POST',
  data: params,
}));

export default videoRegister;
