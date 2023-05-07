import { generateApi } from 'src/api/generate-api';

const signOut = generateApi<{}, any>(() => ({
  url: '/api/v1/sign-out',
  method: 'POST',
}));

export default signOut;
