import { generateQuery } from 'src/api/generate-api';
import { Profile } from 'src/model/auth';

const profileDetailApi = generateQuery<{}, Profile>({
  api: () => ({
    url: '/api/v1/profile',
    method: 'GET',
  }),
  key: () => `profileDetailApi`,
});

export default profileDetailApi;
