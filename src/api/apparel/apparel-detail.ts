import { generateQuery } from '../generate-api';
import { Apparel, ApparelImage } from 'src/model/apparel';

interface ApparelDetailParams {
  apparelId: string;
}

export interface ApparelDetailResult {
  apparel: Apparel;
  images: ApparelImage[];
}

const apparelDetailApi = generateQuery<ApparelDetailParams, ApparelDetailResult>({
  api: (params) => ({
    url: `/api/v1/apparels/${params.apparelId}`,
    method: 'GET',
  }),
  key: 'apparelDetailApi',
});

export default apparelDetailApi;
