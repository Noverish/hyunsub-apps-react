import { t } from 'i18next';

import dutchRecordDeleteApi from 'src/api/dutch/dutch-record-delete';
import { useUrlParams } from 'src/hooks/url-params';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface DutchRecordDetailPageParams {
  tripId: string;
  recordId: string;
}

function usePageParams(): DutchRecordDetailPageParams {
  const [tripId, recordId] = useUrlParams('tripId', 'recordId');
  return { tripId, recordId };
}

function useDelete() {
  const { tripId, recordId } = usePageParams();

  return async () => {
    if (!window.confirm(t('msg.delete-confirm'))) {
      return;
    }

    dispatch(GlobalActions.update({ loading: true }));

    await dutchRecordDeleteApi({ tripId, recordId });

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

const DutchRecordDetailHooks = {
  usePageParams,
  useDelete,
};

export default DutchRecordDetailHooks;
