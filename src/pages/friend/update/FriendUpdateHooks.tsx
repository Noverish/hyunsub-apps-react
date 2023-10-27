import { useParams } from 'react-router-dom';

import friendDetailApi from 'src/api/friend/friend-detail';
import friendListApi from 'src/api/friend/friend-list';
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

    const newFriend = await friendUpdateApi(friend);

    friendDetailApi.setCache({ friendId: friend.id }, newFriend);
    friendListApi.clearCache();

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

const FriendUpdateHooks = {
  usePageData,
  useUpdate,
};

export default FriendUpdateHooks;
