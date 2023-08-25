import { t } from 'i18next';
import { useState } from 'react';

import DiaryCalendarResultView from './components/DiaryCalendarResultView';
import CommonCalendar from 'src/components/common/CommonCalendar';
import LoadingSuspense from 'src/components/common/LoadingSuspense';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { toDateString } from 'src/utils';
import { setDocumentTitle } from 'src/utils/services';

export default function DiaryCalendarPage() {
  setDocumentTitle(t('DiaryCalendarPage.title'));

  // hooks
  const [date, setDate] = useState<Date>(new Date());
  const dateString = toDateString(date);

  return (
    <div className="DiaryCalendarPage">
      <MobileHeader title={t('DiaryCalendarPage.title')} />
      <CommonContainer>
        <div className="flex_center mb-3">
          <CommonCalendar onChange={setDate} initialValue={date} />
        </div>
        <LoadingSuspense>
          <DiaryCalendarResultView date={dateString} />
        </LoadingSuspense>
      </CommonContainer>
    </div>
  );
}
