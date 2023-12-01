import { generateApi } from 'src/api/generate-api';
import { SimpleResponse } from 'src/model/api';
import { filterEmptyString } from 'src/utils';

export interface VideoRegisterParams {
  category?: string;
  videoPath: string;
  outputPath: string;
  videoEntryId?: string;
  videoSeason?: string;
  videoGroupId?: string;
  newGroupName?: string;
  thumbnailUrl?: string;
}

const videoRegister = generateApi<VideoRegisterParams, SimpleResponse>({
  api: (params) => ({
    url: `/api/v1/register`,
    method: 'POST',
    data: filterEmptyString(params),
  }),
});

export default videoRegister;
