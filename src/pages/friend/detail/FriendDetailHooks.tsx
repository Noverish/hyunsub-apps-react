import { useParams } from "react-router-dom";

export interface FriendDetailPageData {
  friendId: string;
}

function usePageData(): FriendDetailPageData {
  const params = useParams();

  const friendId = params.friendId;
  if (!friendId) {
    throw new Error('Invalid parameter - friendId');
  }

  return { friendId };
}

const FriendDetailHooks ={
  usePageData,
}

export default FriendDetailHooks;
