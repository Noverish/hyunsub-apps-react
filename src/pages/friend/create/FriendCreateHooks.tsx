import friendCreateApi from 'src/api/friend/friend-create';
import friendDetailApi from 'src/api/friend/friend-detail';
import friendListApi from 'src/api/friend/friend-list';
import { Friend } from 'src/model/friend';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

function useCreate() {
  return async (friend: Friend) => {
    dispatch(GlobalActions.update({ loading: true }));

    const newFriend = await friendCreateApi(friend);

    friendDetailApi.setCache({ friendId: friend.id }, newFriend);
    friendListApi.clearCache();

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

const FriendCreateHooks = {
  useCreate,
};

export default FriendCreateHooks;
