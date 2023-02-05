import logout from "src/api/auth/logout";

export const logoutAction = () => async () => {
  const href = encodeURIComponent(window.location.href);
  await logout({});
  window.location.href = `https://auth.hyunsub.kim/login?url=${href}`;
}
