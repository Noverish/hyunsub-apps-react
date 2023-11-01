import friendCreateApi from 'src/api/friend/friend-create';
import { Friend } from 'src/model/friend';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

function useCreate() {
  return async (friend: Friend) => {
    dispatch(GlobalActions.update({ loading: true }));

    await friendCreateApi(friend);

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

const FriendCreateHooks = {
  useCreate,
};

export default FriendCreateHooks;
