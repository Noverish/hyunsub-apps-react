import { t } from 'i18next';
import { useParams } from 'react-router-dom';

import DiaryRoutes from '../DiaryRoutes';
import diaryDeleteApi from 'src/api/diary/diary-delete';
import diaryDetailApi from 'src/api/diary/diary-detail';
import diarySearchApi from 'src/api/diary/diary-search';
import diaryStatusMonthApi from 'src/api/diary/diary-status-month';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import { toDateString } from 'src/utils';

export interface DiaryDetailPageData {
  date: string;
}

function usePageData(): DiaryDetailPageData {
  const params = useParams();

  const date = params.date;
  if (!date) {
    throw new Error(`Invalid parameter - date`);
  }

  return { date };
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
  const { date: dateStr } = usePageData();

  return () => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + diffDay);
    const newDateStr = toDateString(date);

    router.navigate(DiaryRoutes.detail(newDateStr), { replace: true });
  };
}

const DiaryDetailHooks = {
  usePageData,
  useDelete,
  useGoToOtherDay,
};

export default DiaryDetailHooks;
