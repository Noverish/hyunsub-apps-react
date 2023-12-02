import { generateApi } from '../generate-api';
import apparelDetailApi from './apparel-detail';
import apparelListApi from './apparel-list';
import { Apparel } from 'src/model/apparel';

interface ApparelDeleteParams {
  apparelId: string;
}

const apparelDeleteApi = generateApi<ApparelDeleteParams, Apparel>({
  api: ({ apparelId }) => ({
    url: `/api/v1/apparels/${apparelId}`,
    method: 'DELETE',
  }),
  postHandle: ({ id: apparelId }) => {
    apparelDetailApi.setCache({ apparelId }, null);
    apparelListApi.clearCache({});
  },
});

export default apparelDeleteApi;
