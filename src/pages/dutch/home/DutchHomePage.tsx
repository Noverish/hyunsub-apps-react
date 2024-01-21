import { DutchHomeProvider } from './DutchHomeContext';
import DutchHomeHooks from './DutchHomeHooks';
import dutchTripDetailApi from 'src/api/dutch/dutch-trip-detail';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import DutchTripCurrencyView from 'src/pages/dutch/home/components/DutchTripCurrencyView';
import DutchTripDetailView from 'src/pages/dutch/home/components/DutchTripDetailView';

function DutchHomePage() {
  const { tripId } = DutchHomeHooks.usePageParams();

  const { data: trip } = dutchTripDetailApi.useApiResult({ tripId });

  return (
    <CommonLayout className="DutchHomePage" title={trip?.name ?? ''}>
      <DutchTripDetailView trip={trip} />
      <DutchTripCurrencyView />
    </CommonLayout>
  );
}

export default function DutchHomeIndex() {
  return (
    <DutchHomeProvider>
      <DutchHomePage />
    </DutchHomeProvider>
  );
}
