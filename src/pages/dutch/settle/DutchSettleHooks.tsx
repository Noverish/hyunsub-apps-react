import { useUrlParams } from 'src/hooks/url-params';

export interface DutchSettlePageParams {
  tripId: string;
}

function usePageParams(): DutchSettlePageParams {
  const [tripId] = useUrlParams('tripId');
  return { tripId };
}

const DutchSettleHooks = {
  usePageParams,
};

export default DutchSettleHooks;
