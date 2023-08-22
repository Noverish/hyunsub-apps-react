import { t } from 'i18next';
import { useParams } from 'react-router-dom';

import diaryDeleteApi from 'src/api/diary/diary-delete';
import diaryDetailApi from 'src/api/diary/diary-detail';
import { Diary } from 'src/model/diary';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface DiaryDetailPageData {
  diary: Diary;
}

function usePageData(): DiaryDetailPageData {
  const params = useParams();

  const date = params.date;
  if (!date) {
    throw new Error(`Invalid parameter - date`);
  }

  const diary = diaryDetailApi.useApi({ date });

  return { diary };
}

function useDelete() {
  return async (date: string) => {
    if (!window.confirm(t('DiaryListPage.confirm-msg'))) {
      return;
    }

    dispatch(GlobalActions.update({ loading: true }));

    await diaryDeleteApi({ date });

    router.navigate(-1);

    dispatch(GlobalActions.update({ loading: false }));
  };
}

const DiaryDetailHooks = {
  usePageData,
  useDelete,
};

export default DiaryDetailHooks;
