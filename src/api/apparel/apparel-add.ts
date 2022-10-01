import { Apparel } from "src/model/apparel";
import { generateApi } from "../generate-api";

const apparelAdd = generateApi<Partial<Apparel>, Apparel>(params => ({
  url: '/api/v1/apparels',
  method: 'POST',
  data: params,
}))

export default apparelAdd;
