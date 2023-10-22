import { useSearchParams } from 'react-router-dom';

import DiaryRoutes from '../DiaryRoutes';
import diaryCreateApi, { DiaryCreateParams } from 'src/api/diary/diary-create';
import diaryDetailApi from 'src/api/diary/diary-detail';
import diarySearchApi from 'src/api/diary/diary-search';
import diaryStatusMonthApi from 'src/api/diary/diary-status-month';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface DiaryCreatePageData {
  date: string | null;
}

function usePageData(): DiaryCreatePageData {
  const [searchParams] = useSearchParams();

  const date = searchParams.get('date');

  return { date };
}

function useCreate() {
  return async (params: DiaryCreateParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    const diary = await diaryCreateApi(params);

    diaryDetailApi.setCache({ date: diary.date }, diary);
    diarySearchApi.invalidate();
    diaryStatusMonthApi.invalidate();

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(DiaryRoutes.detail({ date: diary.date }), { replace: true });
  };
}

const DiaryCreateHooks = {
  usePageData,
  useCreate,
};

export default DiaryCreateHooks;
