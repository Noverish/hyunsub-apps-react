import { useUrlParams } from 'src/hooks/url-params';

export interface DutchSpendPageParams {
  tripId: string;
}

function usePageParams(): DutchSpendPageParams {
  const [tripId] = useUrlParams('tripId');
  return { tripId };
}

const DutchSpendHooks = {
  usePageParams,
};

export default DutchSpendHooks;
