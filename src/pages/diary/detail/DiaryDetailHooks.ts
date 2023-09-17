import { t } from 'i18next';
import { useParams, useSearchParams } from 'react-router-dom';

import DiaryRoutes from '../DiaryRoutes';
import diaryDeleteApi from 'src/api/diary/diary-delete';
import diaryDetailApi from 'src/api/diary/diary-detail';
import diarySearchApi from 'src/api/diary/diary-search';
import diaryStatusMonthApi from 'src/api/diary/diary-status-month';
import { Diary } from 'src/model/diary';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import { toDateString } from 'src/utils';

export interface DiaryDetailPageParams {
  date: string;
  query?: string;
}

export interface DiaryDetailPageData extends DiaryDetailPageParams {
  diary?: Diary;
  isLoading: boolean;
}

function usePageData(): DiaryDetailPageData {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const date = params.date;
  if (!date) {
    throw new Error(`Invalid parameter - date`);
  }

  const query = searchParams.get('query') ?? undefined;

  const { data, isLoading } = diaryDetailApi.useApiResult({ date });
  const diary = data ?? undefined;

  return { date, query, diary, isLoading };
}

function useDelete() {
  return async (date: string) => {
    if (!window.confirm(t('DiaryListPage.confirm-msg'))) {
      return;
    }

    dispatch(GlobalActions.update({ loading: true }));

    await diaryDeleteApi({ date });

    diarySearchApi.clearCache();
    diaryStatusMonthApi.invalidate();

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);

    setTimeout(() => {
      diaryDetailApi.clearCache({ date });
    }, 0);
  };
}

function useGoToOtherDay(diffDay: number) {
  const { date: dateStr, query } = usePageData();

  return () => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + diffDay);
    const newDateStr = toDateString(date);

    router.navigate(DiaryRoutes.detail({ date: newDateStr, query }), { replace: true });
  };
}

const DiaryDetailHooks = {
  usePageData,
  useDelete,
  useGoToOtherDay,
};

export default DiaryDetailHooks;
