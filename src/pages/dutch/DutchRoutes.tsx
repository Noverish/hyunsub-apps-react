import queryString from 'query-string';

import { DutchHomePageParams } from './home/DutchHomeHooks';
import { DutchMemberSelectPageParams } from './member-select/DutchMemberSelectHooks';
import { DutchRecordCreatePageParams } from './record-create/DutchRecordCreateHooks';
import { DutchRecordUpdatePageParams } from './record-update/DutchRecordUpdateHooks';
import { DutchRecordDetailPageParams } from 'src/pages/dutch/record-detail/DutchRecordDetailHooks';
import { DutchRecordListPageParams } from 'src/pages/dutch/record-list/DutchRecordListHooks';
import { DutchSettlePageParams } from 'src/pages/dutch/settle/DutchSettleHooks';

const { stringifyUrl } = queryString;

const DutchRoutes = {
  homeRoute: '/trips/:tripId',
  home: ({ tripId }: DutchHomePageParams) => `/trips/${tripId}`,

  recordListRoute: '/trips/:tripId/records',
  recordList: ({ tripId, ...query }: DutchRecordListPageParams) =>
    stringifyUrl({ url: `/trips/${tripId}/records`, query }),

  recordDetailRoute: '/trips/:tripId/records/:recordId',
  recordDetail: ({ tripId, recordId }: DutchRecordDetailPageParams) => `/trips/${tripId}/records/${recordId}`,

  recordUpdateRoute: '/trips/:tripId/records/:recordId/edit',
  recordUpdate: ({ tripId, recordId }: DutchRecordUpdatePageParams) => `/trips/${tripId}/records/${recordId}/edit`,

  recordCreateRoute: `/trips/:tripId/record/create`,
  recordCreate: ({ tripId }: DutchRecordCreatePageParams) => `/trips/${tripId}/record/create`,

  balanceRoute: `/trips/:tripId/balance`,

  settleRoute: `/trips/:tripId/settle`,
  settle: ({ tripId }: DutchSettlePageParams) => `/trips/${tripId}/settle`,

  memberSelectRoute: `/trips/:tripId/member-select`,
  memberSelect: ({ tripId }: DutchMemberSelectPageParams) => `/trips/${tripId}/member-select`,
};

export default DutchRoutes;
