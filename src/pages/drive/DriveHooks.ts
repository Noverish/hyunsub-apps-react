import { useSearchParams } from 'react-router-dom';

export function usePath(index?: number): [string, (newPath: string) => void, () => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = (index) ? `path${index}` : 'path';
  const path = searchParams.get(name) || '/';

  const setPath = (newPath: string) => {
    if (newPath === '/') {
      searchParams.delete(name);
    } else {
      searchParams.set(name, newPath);
    }
    setSearchParams(searchParams);
  }

  const goParent = () => {
    setPath(getParent(path));
  }

  return [path, setPath, goParent];
}

export function getPath(index?: number): string {
  const name = (index) ? `path${index}` : 'path';
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(name) || '/';
}

export function getParent(path: string) {
  const segments = path.split('/');
  const newPath = segments.slice(0, segments.length - 1).join('/');
  return (newPath === '') ? '/' : newPath;
}
