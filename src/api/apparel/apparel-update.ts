import { generateApi } from '../generate-api';
import apparelDetailApi from './apparel-detail';
import apparelListApi from './apparel-list';
import { Apparel, ApparelInfo } from 'src/model/apparel';

interface ApparelUpdateParams {
  id: string;
  info: ApparelInfo;
  uploads: string[];
  deletes: string[];
}

const apparelUpdateApi = generateApi<ApparelUpdateParams, Apparel>({
  api: (params) => ({
    url: `/api/v1/apparels/${params.id}`,
    method: 'PUT',
    data: params,
  }),
  postHandle: (result) => {
    apparelDetailApi.setCache({ apparelId: result.id }, result);
    apparelListApi.clearCache();
  },
});

export default apparelUpdateApi;
