import { DutchHomePageParams } from './home/DutchHomeHooks';
import { DutchRecordCreatePageParams } from './record-create/DutchRecordCreateHooks';
import { DutchRecordDetailPageParams } from 'src/pages/dutch/record-detail/DutchRecordDetailHooks';
import { DutchRecordListPageParams } from 'src/pages/dutch/record-list/DutchRecordListHooks';

const DutchRoutes = {
  homeRoute: '/trips/:tripId',
  home: ({ tripId }: DutchHomePageParams) => `/trips/${tripId}`,

  recordListRoute: '/trips/:tripId/records',
  recordList: ({ tripId }: DutchRecordListPageParams) => `/trips/${tripId}/records`,

  recordDetailRoute: '/trips/:tripId/records/:recordId',
  recordDetail: ({ tripId, recordId }: DutchRecordDetailPageParams) => `/trips/${tripId}/records/${recordId}`,

  recordCreateRoute: `/trips/:tripId/record/create`,
  recordCreate: ({ tripId }: DutchRecordCreatePageParams) => `/trips/${tripId}/record/create`,

  balanceRoute: `/trips/:tripId/balance`,

  settleRoute: `/trips/:tripId/settle`,
};

export default DutchRoutes;
