import { generateQuery } from "src/api/generate-api";
import { VideoGroupPreview } from 'src/model/video';

const videoGroups = generateQuery<{}, VideoGroupPreview[]>({
  api: () => ({
    url: '/api/v1/groups',
    method: 'GET',
  }),
  key: () => 'videoGroups',
});

export default videoGroups;
