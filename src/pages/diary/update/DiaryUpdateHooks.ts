import diaryUpdateApi, { DiaryUpdateParams } from 'src/api/diary/diary-update';
import { useUrlParams } from 'src/hooks/url-params';
import { Diary } from 'src/model/diary';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface DiaryUpdatePageParams {
  date: string;
}

function usePageParams(): DiaryUpdatePageParams {
  const [date] = useUrlParams('date');
  return { date };
}

function useUpdate() {
  return async ({ friends, ...etc }: Diary) => {
    dispatch(GlobalActions.update({ loading: true }));

    const params: DiaryUpdateParams = {
      friendIds: friends.map((v) => v.id),
      ...etc,
    };

    await diaryUpdateApi(params);

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

const DiaryUpdateHooks = {
  usePageParams,
  useUpdate,
};

export default DiaryUpdateHooks;
