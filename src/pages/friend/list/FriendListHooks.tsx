import { useOptionalUrlParams } from 'src/hooks/url-params';

export interface FriendListPageParams {
  query?: string;
}

function usePageParams(): FriendListPageParams {
  const [query] = useOptionalUrlParams('query');
  return { query };
}

const FriendListHooks = {
  usePageParams,
};

export default FriendListHooks;
