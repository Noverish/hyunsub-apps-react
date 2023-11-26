import { useCallback, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DriveExplorerContext } from './DriveExplorerContext';
import driveListApi from 'src/api/drive/drive-list';
import { useOptionalUrlParams } from 'src/hooks/url-params';
import { DriveFileInfo, DriveFileSorts } from 'src/model/drive';
import { isMac } from 'src/utils/user-agent';

export function useDriveExplorerPath(): [string, (path: string) => void] {
  const [path] = useOptionalUrlParams('path');
  const [searchParams, setSearchParams] = useSearchParams();

  const setPath = (path: string) => {
    searchParams.set('path', path);
    setSearchParams(searchParams);
  };

  return [path ?? '/', setPath];
}

export function useDriveExplorerContext() {
  const [path] = useDriveExplorerPath();
  const [state, setState] = useContext(DriveExplorerContext);

  const { data } = driveListApi.useApiResult({ path });

  return {
    path,
    files: data ?? [],
    selects: state.selects,
    state,
    setState,
  };
}

export function useDriveExplorerSelectChange() {
  const [{ selects }, setState] = useContext(DriveExplorerContext);

  const changeSelects = useCallback(
    (selects: string[]) => {
      setState({ selects, rename: false, lastSelect: undefined });
    },
    [setState],
  );

  const addSelect = useCallback(
    (select: string) => {
      const newSelects = [...selects, select];
      setState({ selects: newSelects, rename: false, lastSelect: select });
    },
    [selects, setState],
  );

  const delSelect = useCallback(
    (select: string) => {
      const newSelects = selects.filter((v) => v !== select);
      changeSelects(newSelects);
    },
    [selects, changeSelects],
  );

  const clearSelects = useCallback(() => {
    changeSelects([]);
  }, [changeSelects]);

  const toggleSelect = useCallback(
    (select: string) => {
      if (selects.includes(select)) {
        delSelect(select);
      } else {
        addSelect(select);
      }
    },
    [selects, addSelect, delSelect],
  );

  return { addSelect, delSelect, toggleSelect, changeSelects, clearSelects };
}

export function useDriveExplorerFileSelect() {
  const [path] = useDriveExplorerPath();
  const [{ selects, lastSelect }, setState] = useContext(DriveExplorerContext);
  const list = driveListApi.useApi({ path }).map((v) => v.name);
  const { addSelect, delSelect } = useDriveExplorerSelectChange();

  return (name: string, e: React.MouseEvent<HTMLDivElement>) => {
    const index = list.indexOf(name);

    const alreadySelected = selects.includes(name);

    if (alreadySelected) {
      delSelect(name);
      return;
    }

    if (e.shiftKey && lastSelect) {
      const lastSelectIndex = list.indexOf(lastSelect);

      const selectIndice = selects.map((v) => list.indexOf(v)).sort((a, b) => a - b);
      const selectIndexChunk: number[][] = [[]];
      for (let i = 0; i < selectIndice.length; i++) {
        const prev = selectIndice[i - 1];
        const curr = selectIndice[i];
        const lastChunk = selectIndexChunk[selectIndexChunk.length - 1];
        if (i === 0 || curr - prev === 1) {
          lastChunk.push(curr);
        } else {
          selectIndexChunk.push([curr]);
        }
      }
      const lastSelectChunk = selectIndexChunk.filter((v) => v.includes(lastSelectIndex))[0];
      selectIndexChunk.splice(selectIndexChunk.indexOf(lastSelectChunk), 1);
      const selects2 = selectIndexChunk.flatMap((v) => v).map((v) => list[v]);

      const [from, to] = [index, lastSelectIndex].sort((a, b) => a - b);
      const newSelects = list.slice(from, to + 1);
      const set = new Set([...selects2, ...newSelects]);

      setState({ lastSelect: name, selects: Array.from(set) });
    } else {
      addSelect(name);
    }
  };
}

export function useDriveExplorerKeyDown() {
  const {
    files,
    selects,
    state: { rename },
    setState,
  } = useDriveExplorerContext();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isSingleSelect = selects.length === 1;
      const selectIndex = files.findIndex((v) => v.name === selects[0]);

      switch (e.key) {
        case 'Enter': {
          if (isMac() && !rename && isSingleSelect) {
            setState({ rename: true });
          }
          break;
        }

        case 'F2': {
          if (!isMac() && !rename && isSingleSelect) {
            setState({ rename: true });
          }
          break;
        }

        case 'ArrowDown': {
          if (selects.length === 0) {
            const newFile = files[0];
            setState({ selects: [newFile.name], lastSelect: newFile.name });
            break;
          }

          const newFile = files[selectIndex + 1];
          if (newFile) {
            setState({ selects: [newFile.name], lastSelect: newFile.name });
          }
          break;
        }

        case 'ArrowUp': {
          if (selects.length === 0) {
            const newFile = files[0];
            setState({ selects: [newFile.name], lastSelect: newFile.name });
            break;
          }

          const newFile = files[selectIndex - 1];
          if (newFile) {
            setState({ selects: [newFile.name], lastSelect: newFile.name });
          }
          break;
        }
      }
    },
    [files, rename, selects, setState],
  );

  useEffect(() => {
    window.onkeydown = handleKeyDown;

    return () => {
      window.onkeydown = null;
    };
  }, [handleKeyDown]);
}

const { NAME_ASC, SIZE_ASC, DATE_ASC, NAME_DESC, SIZE_DESC, DATE_DESC } = DriveFileSorts;

export function useDriveExplorerFilesWithSort() {
  const [path] = useDriveExplorerPath();
  const { data: files } = driveListApi.useApiResult({ path });
  const [{ sort }, setState] = useContext(DriveExplorerContext);

  const sortFunc = (a: DriveFileInfo, b: DriveFileInfo): number => {
    if (a.isDir && !b.isDir) {
      return sort.isAsc ? -1 : 1;
    } else if (!a.isDir && b.isDir) {
      return sort.isAsc ? 1 : -1;
    }

    switch (sort) {
      case NAME_ASC:
        return a.name.localeCompare(b.name);
      case NAME_DESC:
        return b.name.localeCompare(a.name);
      case DATE_ASC:
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case DATE_DESC:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case SIZE_ASC:
        return a.size - b.size;
      case SIZE_DESC:
        return b.size - a.size;
      default:
        return 0;
    }
  };

  const UP = ' ↑';
  const DOWN = ' ↓';

  const nameArrow = sort === NAME_ASC ? UP : sort === NAME_DESC ? DOWN : '';
  const dateArrow = sort === DATE_ASC ? UP : sort === DATE_DESC ? DOWN : '';
  const sizeArrow = sort === SIZE_ASC ? UP : sort === SIZE_DESC ? DOWN : '';

  const onNameClick = () => setState({ sort: sort === NAME_ASC ? NAME_DESC : NAME_ASC });
  const onDateClick = () => setState({ sort: sort === DATE_ASC ? DATE_DESC : DATE_ASC });
  const onSizeClick = () => setState({ sort: sort === SIZE_ASC ? SIZE_DESC : SIZE_ASC });

  return {
    files: files ? [...files].sort(sortFunc) : files,
    nameArrow,
    dateArrow,
    sizeArrow,
    onNameClick,
    onDateClick,
    onSizeClick,
  };
}
