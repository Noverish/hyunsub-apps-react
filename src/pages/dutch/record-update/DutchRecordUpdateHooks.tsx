import dutchRecordUpdateApi, { DutchRecordUpdateParams } from 'src/api/dutch/dutch-record-update';
import { useUrlParams } from 'src/hooks/url-params';
import { DutchRecordParams } from 'src/model/dutch';
import DutchRoutes from 'src/pages/dutch/DutchRoutes';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface DutchRecordUpdatePageParams {
  tripId: string;
  recordId: string;
}

function usePageParams(): DutchRecordUpdatePageParams {
  const [tripId, recordId] = useUrlParams('tripId', 'recordId');
  return { tripId, recordId };
}

function useUpdate() {
  const { tripId, recordId } = usePageParams();

  return async (data: DutchRecordParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    const params: DutchRecordUpdateParams = {
      tripId,
      recordId,
      ...data,
    };

    await dutchRecordUpdateApi(params);

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(DutchRoutes.recordDetail({ tripId, recordId }), { replace: true });
  };
}

const DutchRecordUpdateHooks = {
  usePageParams,
  useUpdate,
};

export default DutchRecordUpdateHooks;
