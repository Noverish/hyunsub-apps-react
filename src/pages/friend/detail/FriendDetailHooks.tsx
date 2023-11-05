import { t } from 'i18next';

import friendDeleteApi from 'src/api/friend/friend-delete';
import { Friend } from 'src/model/friend';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

function useDelete() {
  return async (friend: Friend) => {
    const friendId = friend.id;

    if (!window.confirm(t('FriendDetailPage.delete-confirm', [friend.name]))) {
      return;
    }

    dispatch(GlobalActions.update({ loading: true }));

    await friendDeleteApi({ friendId });

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(-1);
  };
}

const FriendDetailHooks = {
  useDelete,
};

export default FriendDetailHooks;
