import dutchBalanceUpdateBulkApi, { DutchBalanceUpdateBulkParams } from 'src/api/dutch/dutch-balance-update-bulk';
import { useUrlParams } from 'src/hooks/url-params';
import { DutchBalance } from 'src/model/dutch';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface DutchBalanceUpdatePageParams {
  tripId: string;
}

function usePageParams(): DutchBalanceUpdatePageParams {
  const [tripId] = useUrlParams('tripId');
  return { tripId };
}

function useDefaultValues(list: DutchBalance[]): DutchBalanceUpdateBulkParams {
  const { tripId } = usePageParams();

  const data = list.map((v) => ({
    currency: v.currency,
    amount: v.amount ?? 0,
  }));

  return {
    tripId,
    data,
  };
}

function useUpdate() {
  return async (params: DutchBalanceUpdateBulkParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    await dutchBalanceUpdateBulkApi(params);

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

const DutchBalanceUpdateHooks = {
  usePageParams,
  useDefaultValues,
  useUpdate,
};

export default DutchBalanceUpdateHooks;
