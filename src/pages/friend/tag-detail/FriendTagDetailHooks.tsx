import { useParams } from 'react-router-dom';

export interface FriendTagDetailPageData {
  tag: string;
}

function usePageData(): FriendTagDetailPageData {
  const params = useParams();

  const tag = params.tag;
  if (!tag) {
    throw new Error('Invalid parameter - tag');
  }

  return { tag };
}

const FriendTagDetailHooks = {
  usePageData,
};

export default FriendTagDetailHooks;
