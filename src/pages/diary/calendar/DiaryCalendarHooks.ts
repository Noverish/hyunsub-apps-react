import { useSearchParams } from 'react-router-dom';

import { toDateString } from 'src/utils';

export interface DiaryCalendarPageData {
  date: Date;
  setDate: (date: Date) => void;
}

function usePageData(): DiaryCalendarPageData {
  const [searchParams, setSearchParams] = useSearchParams();

  const dateStr = searchParams.get('date');
  const date = dateStr ? new Date(dateStr) : new Date();

  const setDate = (date: Date) => {
    searchParams.set('date', toDateString(date));
    setSearchParams(searchParams);
  };

  return { date, setDate };
}

const DiaryCalendarHooks = {
  usePageData,
};

export default DiaryCalendarHooks;
