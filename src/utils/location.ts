export function getNewUrl(params: { [key: string]: string }): string {
  const searchParams = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([k, v]) => {
    searchParams.set(k, v);
  });
  const { pathname } = window.location;
  const queryStr = searchParams.toString();
  return `${pathname}?${queryStr}`;
}
