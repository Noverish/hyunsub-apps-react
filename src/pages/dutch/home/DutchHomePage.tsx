import DutchHomeHooks from './DutchHomeHooks';
import DutchSettleEachList from './components/DutchSettleEachList';
import dutchTripDetailApi from 'src/api/dutch/dutch-trip-detail';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import DutchTripDetailView from 'src/pages/dutch/home/components/DutchTripDetailView';

export default function DutchHomePage() {
  const { tripId } = DutchHomeHooks.usePageParams();

  const { data: trip } = dutchTripDetailApi.useApiResult({ tripId });

  return (
    <CommonLayout className="DutchHomePage" title={trip?.name ?? ''}>
      <DutchTripDetailView trip={trip} />
      <DutchSettleEachList />
    </CommonLayout>
  );
}
