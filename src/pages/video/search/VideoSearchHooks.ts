import { useSearchParams } from 'react-router-dom';

export interface VideoSearchPageData {
  query: string;
  setQuery: (query: string) => void;
}

function usePageParams(): VideoSearchPageData {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const setQuery = (query: string) => {
    searchParams.set('query', query);
    setSearchParams(searchParams, { replace: true });
  };

  return { query, setQuery };
}

const VideoSearchHooks = {
  usePageParams,
};

export default VideoSearchHooks;
