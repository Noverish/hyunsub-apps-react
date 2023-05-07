import { generateQuery } from 'src/api/generate-api';
import { VideoGroup } from 'src/model/video';

const videoGroups = generateQuery<{}, VideoGroup[]>({
  api: () => ({
    url: '/api/v1/groups',
    method: 'GET',
  }),
  key: () => 'videoGroups',
});

export default videoGroups;
