import { Apparel } from "src/model/apparel";
import { generateQuery } from "../generate-api";

interface ApparelDetailParams {
  apparelId: string;
}

const apparelDetail = generateQuery<ApparelDetailParams, Apparel>({
  api: (params) => ({
    url: `/api/v1/apparels/${params.apparelId}`,
    method: 'GET',
  }),
  key: (params) => `apparel/${params.apparelId}`,
});

export default apparelDetail;
