import { t } from 'i18next';
import { TileArgs } from 'react-calendar/dist/cjs/shared/types';

import DiaryCalendarHooks from './DiaryCalendarHooks';
import DiaryCalendarResultView from './components/DiaryCalendarResultView';
import diaryStatusMonthApi from 'src/api/diary/diary-status-month';
import CommonCalendar from 'src/components/common/CommonCalendar';
import LoadingSuspense from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { toDateString } from 'src/utils';

import './DiaryCalendarPage.scss';

export default function DiaryCalendarPage() {
  // hooks
  const { date, setDate } = DiaryCalendarHooks.usePageParams();
  const dateString = toDateString(date);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const { data } = diaryStatusMonthApi.useApiResult({ year, month });

  const tileClassName = ({ date, view }: TileArgs): string => {
    if (!data || view !== 'month') {
      return '';
    }

    const dateStr = toDateString(date);
    return data.includes(dateStr) ? 'dot' : '';
  };

  return (
    <CommonLayout className="DiaryCalendarPage" title={t('DiaryCalendarPage.title')}>
      <div className="flex_center mb-3">
        <CommonCalendar onDateChange={setDate} initialValue={date} tileClassName={tileClassName} />
      </div>
      <LoadingSuspense>
        <DiaryCalendarResultView date={dateString} />
      </LoadingSuspense>
    </CommonLayout>
  );
}
