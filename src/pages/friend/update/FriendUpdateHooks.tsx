import friendUpdateApi from 'src/api/friend/friend-update';
import { Friend } from 'src/model/friend';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

function useUpdate() {
  return async (friend: Friend) => {
    dispatch(GlobalActions.update({ loading: true }));

    await friendUpdateApi(friend);

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

const FriendUpdateHooks = {
  useUpdate,
};

export default FriendUpdateHooks;
