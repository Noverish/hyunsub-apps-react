import { generateApi } from "../generate-api";

export interface VideoRegisterParams {
  type: string;
  videoPath: string;
  videoEntryId: string;
}

const videoRegister = generateApi<VideoRegisterParams, any>(params => ({
  url: `/api/v1/video`,
  method: 'POST',
  data: params,
}));

export default videoRegister;
