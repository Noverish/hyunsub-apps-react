import { generateNoParamQuery } from "src/api/generate-api";
import { VideoGroupPreview } from 'src/model/video';

const videoGroups = generateNoParamQuery<VideoGroupPreview[]>({
  api: () => ({
    url: '/api/v1/groups',
    method: 'GET',
  }),
  key: () => 'videoGroups',
});

export default videoGroups;
