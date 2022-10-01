import { generateApi } from "../generate-api";

const apparelDelete = generateApi<string, any>(params => ({
  url: `/api/v1/apparels/${params}`,
  method: 'DELETE',
}))

export default apparelDelete;
