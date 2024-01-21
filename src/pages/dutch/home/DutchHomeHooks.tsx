import { useUrlParams } from 'src/hooks/url-params';

export interface DutchHomePageParams {
  tripId: string;
}

function usePageParams(): DutchHomePageParams {
  const [tripId] = useUrlParams('tripId');
  return { tripId };
}

const DutchHomeHooks = {
  usePageParams,
};

export default DutchHomeHooks;
