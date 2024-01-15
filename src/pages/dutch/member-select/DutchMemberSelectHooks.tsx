import { useUrlParams } from 'src/hooks/url-params';

export interface DutchMemberSelectPageParams {
  tripId: string;
}

function usePageParams(): DutchMemberSelectPageParams {
  const [tripId] = useUrlParams('tripId');
  return { tripId };
}

const DutchMemberSelectHooks = {
  usePageParams,
};

export default DutchMemberSelectHooks;
