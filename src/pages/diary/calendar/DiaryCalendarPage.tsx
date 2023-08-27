import { t } from 'i18next';
import { useState } from 'react';
import { OnArgs, TileArgs } from 'react-calendar/dist/cjs/shared/types';

import DiaryCalendarResultView from './components/DiaryCalendarResultView';
import diaryStatusMonthApi from 'src/api/diary/diary-status-month';
import CommonCalendar from 'src/components/common/CommonCalendar';
import LoadingSuspense from 'src/components/common/LoadingSuspense';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { toDateString } from 'src/utils';
import { setDocumentTitle } from 'src/utils/services';

import './DiaryCalendarPage.scss';

export default function DiaryCalendarPage() {
  setDocumentTitle(t('DiaryCalendarPage.title'));

  // hooks
  const [date, setDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(date);
  const dateString = toDateString(date);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth() + 1;
  const { data } = diaryStatusMonthApi.useApiResult({ year, month });

  const tileClassName = ({ date, view }: TileArgs): string => {
    if (!data || view !== 'month') {
      return '';
    }

    const dateStr = toDateString(date);
    return data.includes(dateStr) ? 'dot' : '';
  };

  const onActiveStartDateChange = ({ activeStartDate, view }: OnArgs) => {
    if (view === 'month' && activeStartDate) {
      setViewDate(activeStartDate);
    }
  };

  return (
    <div className="DiaryCalendarPage">
      <MobileHeader title={t('DiaryCalendarPage.title')} />
      <CommonContainer>
        <div className="flex_center mb-3">
          <CommonCalendar
            onDateChange={setDate}
            initialValue={date}
            tileClassName={tileClassName}
            onActiveStartDateChange={onActiveStartDateChange}
          />
        </div>
        <LoadingSuspense>
          <DiaryCalendarResultView date={dateString} />
        </LoadingSuspense>
      </CommonContainer>
    </div>
  );
}
