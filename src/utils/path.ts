export function join(...paths: string[]): string {
  const firstSlash = paths[0].startsWith('/');

  const result = paths
    .map(v => v.replace(/^\//, ''))
    .map(v => v.replace(/\/$/, ''))
    .filter(v => !!v)
    .join('/');

  return (firstSlash ? '/' : '') + result;
}

export function dirname(path: string) {
  const segments = path.split('/');
  const newPath = segments.slice(0, segments.length - 1).join('/');
  return (newPath === '') ? '/' : newPath;
}
