import DutchRoutes from '../DutchRoutes';
import dutchRecordCreateApi, { DutchRecordCreateParams } from 'src/api/dutch/dutch-record-create';
import { useUrlParams } from 'src/hooks/url-params';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface DutchRecordCreatePageParams {
  tripId: string;
}

function usePageParams(): DutchRecordCreatePageParams {
  const [tripId] = useUrlParams('tripId');
  return { tripId };
}

function useCreate() {
  return async (params: DutchRecordCreateParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    const result = await dutchRecordCreateApi(params);
    const recordId = result.record.id;
    const tripId = params.tripId;

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(DutchRoutes.recordDetail({ tripId, recordId }), { replace: true });
  };
}

const DutchRecordCreateHooks = {
  usePageParams,
  useCreate,
};

export default DutchRecordCreateHooks;
