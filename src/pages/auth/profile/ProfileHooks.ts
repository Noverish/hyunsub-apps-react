import { t } from 'i18next';
import { useContext } from 'react';

import AuthRoutes from '../AuthRoutes';
import rsaKey from 'src/api/auth/auth/rsa-key';
import logoutApi from 'src/api/auth/logout';
import profileDetailApi from 'src/api/auth/profile-detail';
import profileUpdateApi from 'src/api/auth/profile-update';
import withdrawApi from 'src/api/auth/withdraw';
import { ProfileContext } from 'src/pages/auth/profile/ProfileContext';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import { encrypt } from 'src/utils/rsa-key';

function useModifyUsername() {
  const setState = useContext(ProfileContext)[1];

  return async (username: string) => {
    dispatch(GlobalActions.update({ loading: true }));

    const { publicKey } = await rsaKey({});

    const encrypted = encrypt(publicKey, username);

    await profileUpdateApi({ username: encrypted });
    profileDetailApi.clearCache();

    await logoutApi({});

    setState({ showUsernameModal: false });
    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(AuthRoutes.login);
  };
}

function useModifyPassword() {
  const setState = useContext(ProfileContext)[1];

  return async (password: string) => {
    dispatch(GlobalActions.update({ loading: true }));

    const { publicKey } = await rsaKey({});

    const encrypted = encrypt(publicKey, password);

    await profileUpdateApi({ password: encrypted });
    profileDetailApi.clearCache();

    await logoutApi({});

    setState({ showPasswordModal: false });
    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(AuthRoutes.login);
  };
}

function useWithdraw() {
  return async () => {
    if (!window.confirm(t('auth.sign-out.confirm') as string)) {
      return;
    }

    dispatch(GlobalActions.update({ loading: true }));

    await withdrawApi({});
    profileDetailApi.clearCache();

    alert(t('auth.sign-out.success'));

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(AuthRoutes.login);
  };
}

const ProfileHooks = {
  useModifyUsername,
  useModifyPassword,
  useWithdraw,
};

export default ProfileHooks;
