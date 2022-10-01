import { ApparelImage } from "src/model/apparel";
import { generateApi } from "../generate-api";

const apparelImageDelete = generateApi<ApparelImage, any>(params => ({
  url: `/api/v1/apparels/${params.apparelId}/images/${params.imageId}`,
  method: 'DELETE',
}))

export default apparelImageDelete;
