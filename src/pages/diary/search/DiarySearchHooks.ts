import { useSearchParams } from 'react-router-dom';

export interface DiarySearchPageData {
  query: string;
  page: number;
  setPage: (page: number) => void;
}

function usePageData(): DiarySearchPageData {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('p') || '0');

  const setPage = (p: number) => {
    searchParams.set('p', p.toString());
    setSearchParams(searchParams, { replace: true });
  };

  return { query, page, setPage };
}

const DiarySearchHooks = {
  usePageData,
};

export default DiarySearchHooks;
