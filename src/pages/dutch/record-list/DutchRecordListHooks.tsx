import { useUrlParams } from 'src/hooks/url-params';

export interface DutchRecordListPageParams {
  tripId: string;
}

function usePageParams(): DutchRecordListPageParams {
  const [tripId] = useUrlParams('tripId');
  return { tripId };
}

const DutchRecordListHooks = {
  usePageParams,
};

export default DutchRecordListHooks;
