import { useSearchParams } from 'react-router-dom';

import DiaryRoutes from '../DiaryRoutes';
import router from 'src/pages/router';

export interface DiaryListPageData {
  query: string;
}

function usePageData(): DiaryListPageData {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  return { query };
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
