import { t } from 'i18next';

import friendDeleteApi from 'src/api/friend/friend-delete';
import { useUrlParams } from 'src/hooks/url-params';
import { Friend } from 'src/model/friend';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface FriendDetailPageParams {
  friendId: string;
}

function usePageParams(): FriendDetailPageParams {
  const [friendId] = useUrlParams('friendId');

  return { friendId };
}

function useDelete() {
  return async (friend: Friend) => {
    if (!window.confirm(t('FriendDetailPage.delete-confirm', [friend.name]))) {
      return;
    }

    dispatch(GlobalActions.update({ loading: true }));

    await friendDeleteApi({ friendId: friend.id });

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

const FriendDetailHooks = {
  usePageParams,
  useDelete,
};

export default FriendDetailHooks;
