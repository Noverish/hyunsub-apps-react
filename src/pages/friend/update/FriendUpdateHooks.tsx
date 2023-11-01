import { useParams } from 'react-router-dom';

import friendUpdateApi from 'src/api/friend/friend-update';
import { Friend } from 'src/model/friend';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface FriendUpdatePageData {
  friendId: string;
}

function usePageData(): FriendUpdatePageData {
  const params = useParams();

  const friendId = params.friendId;
  if (!friendId) {
    throw new Error('Invalid parameter - friendId');
  }

  return { friendId };
}

function useUpdate() {
  return async (friend: Friend) => {
    dispatch(GlobalActions.update({ loading: true }));

    await friendUpdateApi(friend);

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

const FriendUpdateHooks = {
  usePageData,
  useUpdate,
};

export default FriendUpdateHooks;
