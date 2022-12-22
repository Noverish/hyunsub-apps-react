import { useSearchParams } from 'react-router-dom';

export function usePath(): [string, (newPath: string) => void] {
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

  return [path, setPath];
}

export function getPath(): string {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('path') || '/';
}

export function setPath(path: string) {

}
