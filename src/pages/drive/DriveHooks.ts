import { useSearchParams } from 'react-router-dom';

export function usePath(): [string, (newPath: string) => void, () => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const path = searchParams.get('path') || '/';

  const setPath = (newPath: string) => {
    if (newPath === '/') {
      searchParams.delete('path');
    } else {
      searchParams.set('path', newPath);
    }
    setSearchParams(searchParams);
  }

  const goParent = () => {
    setPath(getParent(path));
  }

  return [path, setPath, goParent];
}

export function getPath(): string {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('path') || '/';
}

export function setPath(path: string) {

}

export function getParent(path: string) {
  const segments = path.split('/');
  const newPath = segments.slice(0, segments.length - 1).join('/');
  return (newPath === '') ? '/' : newPath;
}
