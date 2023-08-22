import DiaryRoutes from '../DiaryRoutes';
import diaryCreateApi from 'src/api/diary/diary-create';
import diaryDetailApi from 'src/api/diary/diary-detail';
import { Diary } from 'src/model/diary';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

function useCreate() {
  return async (diary: Diary) => {
    dispatch(GlobalActions.update({ loading: true }));

    await diaryCreateApi(diary);

    diaryDetailApi.setCache({ date: diary.date }, diary);

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(DiaryRoutes.detail(diary.date), { replace: true });
  };
}

const DiaryCreateHooks = {
  useCreate,
};

export default DiaryCreateHooks;
