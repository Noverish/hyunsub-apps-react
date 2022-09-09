import logout from "src/api/auth/logout";
import getAuthorities from "src/api/auth/authorities";

export const logoutAction = () => async () => {
  const href = encodeURIComponent(window.location.href);
  await logout();
  window.location.href = `https://auth.hyunsub.kim/login?url=${href}`;
}

export const loadAuthorities = () => async () => {
  const { pathname } = window.location;
  if (pathname !== '/login' && pathname !== '/register') {
    getAuthorities.prefetch();
  }
};
