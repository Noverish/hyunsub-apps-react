import { useSearchParams } from 'react-router-dom';

function usePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('p') || '0');

  const setPage = (p: number) => {
    searchParams.set('p', p.toString());
    setSearchParams(searchParams, { replace: true });
  };

  return { page, setPage };
}

function useQuery() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const setQuery = (query: string) => {
    searchParams.set('query', query);
    searchParams.delete('p');
    setSearchParams(searchParams);
  };

  return { query, setQuery };
}

const CommonPageHooks = {
  usePage,
  useQuery,
};

export default CommonPageHooks;
