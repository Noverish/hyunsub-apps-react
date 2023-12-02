import friendUpdateApi from 'src/api/friend/friend-update';
import { useUrlParams } from 'src/hooks/url-params';
import { Friend } from 'src/model/friend';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface FriendUpdatePageParams {
  friendId: string;
}

function usePageParams(): FriendUpdatePageParams {
  const [friendId] = useUrlParams('friendId');
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
  usePageParams,
  useUpdate,
};

export default FriendUpdateHooks;
