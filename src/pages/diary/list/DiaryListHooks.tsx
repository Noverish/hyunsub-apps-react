import { useOptionalUrlParams } from 'src/hooks/url-params';

export interface DiaryListPageParams {
  query?: string;
}

function usePageParams(): DiaryListPageParams {
  const [query] = useOptionalUrlParams('query');
  return { query };
}

const DiaryListHooks = {
  usePageParams,
};

export default DiaryListHooks;
