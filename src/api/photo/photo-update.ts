import { Photo } from "src/model/photo";
import { generateApi } from "../generate-api";

const photoUpdateApi = generateApi<Partial<Photo>, Photo>(params => {
  const { id, ...data } = params;
  return {
    url: `/api/v1/photos/${id}`,
    method: 'PUT',
    data,
  }
})

export default photoUpdateApi;
