import DiaryRoutes from '../DiaryRoutes';
import diaryCreateApi, { DiaryCreateParams } from 'src/api/diary/diary-create';
import { useOptionalUrlParams } from 'src/hooks/url-params';
import { Diary } from 'src/model/diary';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface DiaryCreatePageParams {
  date?: string;
}

function usePageParams(): DiaryCreatePageParams {
  const [date] = useOptionalUrlParams('date');
  return { date };
}

function useCreate() {
  return async ({ friends, ...etc }: Diary) => {
    dispatch(GlobalActions.update({ loading: true }));

    const params: DiaryCreateParams = {
      friendIds: friends.map((v) => v.id),
      ...etc,
    };

    const diary = await diaryCreateApi(params);

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(DiaryRoutes.detail({ date: diary.date }), { replace: true });
  };
}

const DiaryCreateHooks = {
  usePageParams,
  useCreate,
};

export default DiaryCreateHooks;
