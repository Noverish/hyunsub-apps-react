import userDeleteApi from 'src/api/auth/admin/user-delete';
import { UserDeleteParams } from 'src/api/auth/admin/user-delete';
import userListApi from 'src/api/auth/admin/user-list';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

function useDelete() {
  return async (params: UserDeleteParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    await userDeleteApi(params);
    userListApi.clearCache();

    dispatch(GlobalActions.update({ loading: false }));
  };
}

const AuthAdminHooks = {
  useDelete,
};

export default AuthAdminHooks;
