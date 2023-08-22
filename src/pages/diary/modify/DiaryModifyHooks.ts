import { useParams } from 'react-router-dom';

import diaryDetailApi from 'src/api/diary/diary-detail';
import diaryModifyApi from 'src/api/diary/diary-modify';
import { Diary } from 'src/model/diary';
import DiaryRoutes from 'src/pages/diary/DiaryRoutes';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface DiaryModifyPageData {
  diary: Diary;
}

function usePageData(): DiaryModifyPageData {
  const params = useParams();

  const date = params.date;
  if (!date) {
    throw new Error(`Invalid parameter - date`);
  }

  const diary = diaryDetailApi.useApi({ date });

  return { diary };
}

function useModify() {
  return async (diary: Diary) => {
    dispatch(GlobalActions.update({ loading: true }));

    await diaryModifyApi(diary);

    diaryDetailApi.setCache({ date: diary.date }, diary);

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(DiaryRoutes.detail(diary.date));
  };
}

const DiaryModifyHooks = {
  usePageData,
  useModify,
};

export default DiaryModifyHooks;
