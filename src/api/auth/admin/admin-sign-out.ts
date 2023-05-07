import { generateApi } from 'src/api/generate-api';

interface AdminSignOutParams {
  idNo: string;
}

const adminSignOut = generateApi<AdminSignOutParams, undefined>((params: AdminSignOutParams) => ({
  url: '/api/v1/admin/sign-out',
  method: 'POST',
  data: params,
}));

export default adminSignOut;
