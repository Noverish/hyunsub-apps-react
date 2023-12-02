import { generateQuery } from '../generate-api';
import { Apparel } from 'src/model/apparel';

interface ApparelDetailParams {
  apparelId: string;
}

const apparelDetailApi = generateQuery<ApparelDetailParams, Apparel | null>({
  api: (params) => ({
    url: `/api/v1/apparels/${params.apparelId}`,
    method: 'GET',
  }),
  key: 'apparelDetailApi',
});

export default apparelDetailApi;
