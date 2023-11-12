import { t } from 'i18next';

import DiaryRoutes from '../DiaryRoutes';
import diaryDeleteApi from 'src/api/diary/diary-delete';
import { useOptionalUrlParams, useUrlParams } from 'src/hooks/url-params';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import { toDateString } from 'src/utils';

export interface DiaryDetailPageParams {
  date: string;
  query?: string;
}

function usePageParams(): DiaryDetailPageParams {
  const [date] = useUrlParams('date');
  const [query] = useOptionalUrlParams('query');

  return { date, query };
}

function useDelete() {
  return async (date: string) => {
    if (!window.confirm(t('DiaryListPage.confirm-msg'))) {
      return;
    }

    dispatch(GlobalActions.update({ loading: true }));

    await diaryDeleteApi({ date });

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

function useGoToOtherDay(diffDay: number) {
  const { date: dateStr, query } = usePageParams();

  return () => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + diffDay);
    const newDateStr = toDateString(date);

    router.navigate(DiaryRoutes.detail({ date: newDateStr, query }), { replace: true });
  };
}

const DiaryDetailHooks = {
  usePageParams,
  useDelete,
  useGoToOtherDay,
};

export default DiaryDetailHooks;
