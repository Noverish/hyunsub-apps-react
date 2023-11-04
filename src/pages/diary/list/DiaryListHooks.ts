import { useSearchParams } from 'react-router-dom';

export interface DiaryListPageData {
  page: number;
  setPage: (page: number) => void;
}

function usePageParams(): DiaryListPageData {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('p') || '0');

  const setPage = (p: number) => {
    searchParams.set('p', p.toString());
    setSearchParams(searchParams);
  };

  return { page, setPage };
}

const DiaryListHooks = {
  usePageParams,
};

export default DiaryListHooks;
