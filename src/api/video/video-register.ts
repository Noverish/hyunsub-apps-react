import { generateApi } from "../generate-api";

export interface VideoRegisterParams {
  category: string;
  videoPath: string;
  outputPath: string;
}

const videoRegister = generateApi<VideoRegisterParams, any>(params => ({
  url: `/api/v1/video`,
  method: 'POST',
  data: params,
}));

export default videoRegister;
