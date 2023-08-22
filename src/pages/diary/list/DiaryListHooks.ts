import { useSearchParams } from 'react-router-dom';

import DiaryRoutes from '../DiaryRoutes';
import diarySearchApi from 'src/api/diary/diary-search';
import { Diary } from 'src/model/diary';
import router from 'src/pages/router';

export interface DiaryListPageData {
  query: string;
  data: Diary[];
}

function usePageData(): DiaryListPageData {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const { infiniteData } = diarySearchApi.useInfiniteApi({ query });

  return { query, data: infiniteData };
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
