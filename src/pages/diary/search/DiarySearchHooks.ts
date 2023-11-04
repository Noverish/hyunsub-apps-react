import { useSearchParams } from 'react-router-dom';

export interface DiarySearchPageData {
  query: string;
  page: number;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
}

function usePageParams(): DiarySearchPageData {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('p') || '0');

  const setQuery = (query: string) => {
    searchParams.set('query', query);
    setSearchParams(searchParams, { replace: true });
  };

  const setPage = (p: number) => {
    searchParams.set('p', p.toString());
    setSearchParams(searchParams, { replace: true });
  };

  return { query, page, setQuery, setPage };
}

const DiarySearchHooks = {
  usePageParams,
};

export default DiarySearchHooks;
