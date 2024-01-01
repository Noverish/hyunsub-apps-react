import { DutchHomePageParams } from './home/DutchHomeHooks';
import { DutchRecordListPageParams } from 'src/pages/dutch/record/DutchRecordListHooks';

const DutchRoutes = {
  homeRoute: '/trips/:tripId',
  home: ({ tripId }: DutchHomePageParams) => `/trips/${tripId}`,

  recordListRoute: '/trips/:tripId/records',
  recordList: ({ tripId }: DutchRecordListPageParams) => `/trips/${tripId}/records`,

  balanceRoute: `/trips/:tripId/balance`,

  settleRoute: `/trips/:tripId/settle`,
};

export default DutchRoutes;
