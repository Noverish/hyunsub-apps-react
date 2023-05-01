import { Apparel } from "src/model/apparel";
import { generateApi } from "../generate-api";

interface ApparelUpdateParams {
  apparelId: string;
  apparel: Partial<Apparel>;
}

const apparelUpdateApi = generateApi<ApparelUpdateParams, Apparel>(params => ({
  url: `/api/v1/apparels/${params.apparelId}`,
  method: 'PUT',
  data: params.apparel,
}))

export default apparelUpdateApi;
