import { useContext } from 'react';
import driveListApi from 'src/api/drive/drive-list';
import driveRenameBulkApi, { DriveRenameBulkParamsData } from 'src/api/drive/drive-rename-bulk';
import { useDriveExplorerContext } from 'src/components/drive/explorer/DriveExplorerHooks';
import { DriveRenameContext } from './DriveRenameContext';

export function useDriveRenameReset() {
  const { state: { selects } } = useDriveExplorerContext();
  const setState = useContext(DriveRenameContext)[1];

  return () => {
    setState({ renames: selects });
  }
}

export function useDriveRenameReplace() {
  const [{ renames }, setState] = useContext(DriveRenameContext);

  return (from: string, to: string) => {
    const regex = new RegExp(from);
    const newRenames = renames.map(v => v.replace(regex, to));

    setState({ renames: newRenames });
  }
}

export function useDriveRenameAddNumber() {
  const [{ renames }, setState] = useContext(DriveRenameContext);

  return (front: boolean, startNum: number, padNum: number) => {
    const newRenames = renames.map((v, i) => {
      const num = (startNum + i).toString().padStart(padNum, '0');
      return (front ? num : '') + v + (!front ? num : '');
    });

    setState({ renames: newRenames });
  }
}

export function useDriveRenamePadNumber() {
  const [{ renames }, setState] = useContext(DriveRenameContext);

  return (padNum: number) => {
    const newRenames = renames.map((v) => {
      return v.replace(/\d+/, (m) => m.padStart(padNum, '0'));
    });

    setState({ renames: newRenames });
  }
}

export function useDriveRenameBulk() {
  const { path, state: { selects: prev }, setState } = useDriveExplorerContext();
  const [{ renames: next }] = useContext(DriveRenameContext);

  return () => {
    const renames: DriveRenameBulkParamsData[] = [];
    for (let i = 0; i < prev.length; i++) {
      const from = prev[i];
      const to = next[i];
      if (from !== to) {
        renames.push({ from, to });
      }
    }

    driveRenameBulkApi({ path, renames });

    driveListApi.updateCache({ path }, (cache) => {
      for (const item of cache) {
        const i = prev.indexOf(item.name);
        if (i >= 0) {
          item.name = next[i];
        }
      }
    })

    setState({ selects: next, renameBulk: false, lastSelect: undefined });
  }
}
