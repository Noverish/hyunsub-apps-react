import { useParams } from 'react-router-dom';

import diaryDetailApi from 'src/api/diary/diary-detail';
import diarySearchApi from 'src/api/diary/diary-search';
import diaryStatusMonthApi from 'src/api/diary/diary-status-month';
import diaryUpdateApi, { DiaryUpdateParams } from 'src/api/diary/diary-update';
import { Diary } from 'src/model/diary';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface DiaryUpdatePageData {
  diary: Diary | null;
}

function usePageData(): DiaryUpdatePageData {
  const params = useParams();

  const date = params.date;
  if (!date) {
    throw new Error(`Invalid parameter - date`);
  }

  const diary = diaryDetailApi.useApi({ date });

  return { diary };
}

function useUpdate() {
  return async ({ friends, ...etc }: Diary) => {
    dispatch(GlobalActions.update({ loading: true }));

    const params: DiaryUpdateParams = {
      friendIds: friends.map((v) => v.id),
      ...etc,
    };

    const diary = await diaryUpdateApi(params);

    diaryDetailApi.setCache({ date: diary.date }, diary);
    diarySearchApi.invalidate();
    diaryStatusMonthApi.invalidate();

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

const DiaryUpdateHooks = {
  usePageData,
  useUpdate,
};

export default DiaryUpdateHooks;