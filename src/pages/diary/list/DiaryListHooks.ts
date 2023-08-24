import { useSearchParams } from 'react-router-dom';

import DiaryRoutes from '../DiaryRoutes';
import diarySearchApi from 'src/api/diary/diary-search';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface DiaryListPageData {
  page: number;
  setPage: (page: number) => void;
}

function usePageData(): DiaryListPageData {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('p') || '0');

  const setPage = (p: number) => {
    searchParams.set('p', p.toString());
    setSearchParams(searchParams);
  };

  return { page, setPage };
}

function useSearch() {
  return async (query: string) => {
    dispatch(GlobalActions.update({ loading: true }));

    await diarySearchApi.fetch({ page: 0, query });

    router.navigate(DiaryRoutes.search(query));

    dispatch(GlobalActions.update({ loading: false }));
  };
}

const DiaryListHooks = {
  usePageData,
  useSearch,
};

export default DiaryListHooks;
