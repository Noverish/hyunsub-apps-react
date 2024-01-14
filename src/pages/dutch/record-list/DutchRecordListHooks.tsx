import { useOptionalUrlParams, useUrlParams } from 'src/hooks/url-params';
import { DutchCurrency, dutchCurrencyList } from 'src/model/dutch';

export interface DutchRecordListPageParams {
  tripId: string;
  query?: string;
  currency?: DutchCurrency;
}

function usePageParams(): DutchRecordListPageParams {
  const [tripId] = useUrlParams('tripId');
  const [query, _currency] = useOptionalUrlParams('query', 'currency');

  const currency = dutchCurrencyList.filter((v) => v === _currency)[0];

  return { tripId, query, currency };
}

const DutchRecordListHooks = {
  usePageParams,
};

export default DutchRecordListHooks;
