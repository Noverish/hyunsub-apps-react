import { useSelector } from 'src/redux';

export default function useIsAdmin() {
  return useSelector((s) => s.global.tokenPayload?.isAdmin || false);
}
