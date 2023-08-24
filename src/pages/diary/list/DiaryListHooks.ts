import { useSearchParams } from 'react-router-dom';

import DiaryRoutes from '../DiaryRoutes';
import router from 'src/pages/router';

export interface DiaryListPageData {
  query: string;
  page: number;
  setPage: (page: number) => void;
}

function usePageData(): DiaryListPageData {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('p') || '0');

  const setPage = (p: number) => {
    searchParams.set('p', p.toString());
    setSearchParams(searchParams);
  };

  return { query, page, setPage };
}

function useSearch() {
  return async (query: string) => {
    router.navigate(DiaryRoutes.list(query));
  };
}

const DiaryListHooks = {
  usePageData,
  useSearch,
};

export default DiaryListHooks;
