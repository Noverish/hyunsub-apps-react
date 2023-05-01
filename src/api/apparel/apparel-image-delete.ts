import { ApparelImage } from "src/model/apparel";
import { generateApi } from "../generate-api";

const apparelImageDeleteApi = generateApi<ApparelImage, any>(params => ({
  url: `/api/v1/apparels/${params.apparelId}/images/${params.imageId}`,
  method: 'DELETE',
}))

export default apparelImageDeleteApi;
