import { generateApi } from '../generate-api';
import { ApparelDetailResult } from './apparel-detail';
import { Apparel, ApparelUploadImageParams } from 'src/model/apparel';

interface ApparelUpdateParams {
  apparel: Apparel;
  uploads: ApparelUploadImageParams[];
  deletes: string[];
}

const apparelUpdateApi = generateApi<ApparelUpdateParams, ApparelDetailResult>({
  api: (params) => ({
    url: `/api/v1/apparels/${params.apparel.id}`,
    method: 'PUT',
    data: params,
  }),
});

export default apparelUpdateApi;
