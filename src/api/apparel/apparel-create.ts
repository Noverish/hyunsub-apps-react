import { generateApi } from '../generate-api';
import { ApparelDetailResult } from './apparel-detail';
import { Apparel, ApparelUploadImageParams } from 'src/model/apparel';

interface ApparelCreateParams {
  apparel: Apparel;
  uploads: ApparelUploadImageParams[];
}

const apparelCreateApi = generateApi<ApparelCreateParams, ApparelDetailResult>((params) => ({
  url: '/api/v1/apparels',
  method: 'POST',
  data: params,
}));

export default apparelCreateApi;
