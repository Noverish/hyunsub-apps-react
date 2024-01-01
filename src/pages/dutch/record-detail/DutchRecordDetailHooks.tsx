import { useUrlParams } from 'src/hooks/url-params';

export interface DutchRecordDetailPageParams {
  tripId: string;
  recordId: string;
}

function usePageParams(): DutchRecordDetailPageParams {
  const [tripId, recordId] = useUrlParams('tripId', 'recordId');
  return { tripId, recordId };
}

const DutchRecordDetailHooks = {
  usePageParams,
};

export default DutchRecordDetailHooks;
