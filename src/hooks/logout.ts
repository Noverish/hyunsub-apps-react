import logout from 'src/api/auth/logout';

export default function useLogout(goToHome: Boolean = false) {
  return async () => {
    const href = encodeURIComponent(window.location.href);
    await logout({});

    if (goToHome) {
      window.location.href = `https://auth.hyunsub.kim/login`;
    } else {
      window.location.href = `https://auth.hyunsub.kim/login?url=${href}`;
    }
  }
}
