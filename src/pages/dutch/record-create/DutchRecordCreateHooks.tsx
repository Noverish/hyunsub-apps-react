import { useUrlParams } from 'src/hooks/url-params';

export interface DutchRecordCreatePageParams {
  tripId: string;
}

function usePageParams(): DutchRecordCreatePageParams {
  const [tripId] = useUrlParams('tripId');
  return { tripId };
}

const DutchRecordCreateHooks = {
  usePageParams,
};

export default DutchRecordCreateHooks;
