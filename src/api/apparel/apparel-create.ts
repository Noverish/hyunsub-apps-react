import { generateApi } from '../generate-api';
import apparelDetailApi from 'src/api/apparel/apparel-detail';
import apparelListApi from 'src/api/apparel/apparel-list';
import { Apparel, ApparelInfo } from 'src/model/apparel';

interface ApparelCreateParams {
  info: ApparelInfo;
  uploads: string[];
}

const apparelCreateApi = generateApi<ApparelCreateParams, Apparel>({
  api: (params) => ({
    url: '/api/v1/apparels',
    method: 'POST',
    data: params,
  }),
  postHandle: (result) => {
    apparelDetailApi.setCache({ apparelId: result.id }, result);
    apparelListApi.clearCache();
  },
});

export default apparelCreateApi;
