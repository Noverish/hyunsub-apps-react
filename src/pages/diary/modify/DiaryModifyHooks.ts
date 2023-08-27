import { useParams } from 'react-router-dom';

import diaryDetailApi from 'src/api/diary/diary-detail';
import diaryModifyApi from 'src/api/diary/diary-modify';
import diarySearchApi from 'src/api/diary/diary-search';
import diaryStatusMonthApi from 'src/api/diary/diary-status-month';
import { Diary } from 'src/model/diary';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface DiaryModifyPageData {
  diary: Diary | null;
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
    diarySearchApi.invalidate();
    diaryStatusMonthApi.invalidate();

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

const DiaryModifyHooks = {
  usePageData,
  useModify,
};

export default DiaryModifyHooks;
