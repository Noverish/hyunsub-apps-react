import FriendRoutes from '../FriendRoutes';
import friendCreateApi from 'src/api/friend/friend-create';
import { Friend } from 'src/model/friend';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

function useCreate() {
  return async (friend: Friend) => {
    dispatch(GlobalActions.update({ loading: true }));

    const result = await friendCreateApi(friend);

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(FriendRoutes.detail(result.id), { replace: true });
  };
}

const FriendCreateHooks = {
  useCreate,
};

export default FriendCreateHooks;
