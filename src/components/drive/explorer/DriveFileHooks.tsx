import { t } from 'i18next';
import { join } from 'path-browserify';
import { useContext } from 'react';

import driveListApi from 'src/api/drive/drive-list';
import driveMoveBulkApi, { DriveMoveBulkParams } from 'src/api/drive/drive-move-bulk';
import driveNewFolderApi from 'src/api/drive/drive-new-folder';
import driveRemoveBulkApi from 'src/api/drive/drive-remove-bulk';
import driveRenameBulkApi from 'src/api/drive/drive-rename-bulk';
import { DriveExplorerContext } from 'src/components/drive/explorer/DriveExplorerContext';
import {
  useDriveExplorerContext,
  useDriveExplorerSelectChange,
} from 'src/components/drive/explorer/DriveExplorerHooks';
import { DriveFileInfo } from 'src/model/drive';
import { dateToString } from 'src/utils';
import AppConstant from 'src/utils/constants';

export function useDriveFileRename() {
  const { path, selects } = useDriveExplorerContext();
  const { changeSelects } = useDriveExplorerSelectChange();

  return (from: string, to: string) => {
    driveRenameBulkApi({ path, renames: [{ from, to: to.trim() }] });

    driveListApi.updateCache({ path }, (cache) => {
      cache.forEach((v) => {
        if (v.name === from) {
          v.name = to;
        }
      });
    });

    const newSelects = selects.map((v) => (v === from ? to : v));
    changeSelects(newSelects);
  };
}

export function useDriveFileRemove() {
  const { path, selects } = useDriveExplorerContext();
  const { clearSelects } = useDriveExplorerSelectChange();
  const paths = selects.map((v) => join(path, v));

  return () => {
    if (!window.confirm(t('drive.msg.remove-confirm') as string)) {
      return;
    }

    driveRemoveBulkApi({ paths });

    driveListApi.updateCache({ path }, (cache) => {
      return cache.filter((v) => !selects.includes(v.name));
    });

    clearSelects();
  };
}

export function useDriveNewFolder() {
  const { path, files } = useDriveExplorerContext();
  const list = files.map((v) => v.name);
  const setState = useContext(DriveExplorerContext)[1];

  return () => {
    let name = t('drive.DriveExplorerFileList.new-folder');
    for (let i = 2; list.includes(name); i++) {
      name = t('drive.DriveExplorerFileList.new-folder') + ` ${i}`;
    }
    const folderPath = path + '/' + name;

    driveNewFolderApi({ path: folderPath });

    driveListApi.updateCache({ path }, (cache) => {
      const newFolder: DriveFileInfo = {
        name,
        size: 0,
        date: dateToString(new Date()),
        isDir: true,
      };
      return [newFolder, ...cache];
    });

    setState({
      selects: [name],
      rename: true,
      lastSelect: name,
    });
  };
}

export function useDriveFileDownload() {
  const { path, files, selects } = useDriveExplorerContext();

  return () => {
    for (let i = 0; i < selects.length; i++) {
      const select = selects[i];
      const file = files[files.findIndex((v) => v.name === select)];
      if (file.isDir) {
        // TODO notify properly to user
        continue;
      }

      const fileUrl = AppConstant.file.HOST + join(path, file.name) + '?download';

      setTimeout(() => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = file.name;
        link.click();
      }, i * 1000);
    }
  };
}

export function useDriveFileMove() {
  const { path } = useDriveExplorerContext();

  return (params: DriveMoveBulkParams) => {
    if (params.from === params.to) {
      return;
    }

    driveMoveBulkApi(params);

    driveListApi.updateCache({ path }, (cache) => {
      return cache.filter((v) => !params.files.includes(v.name));
    });
  };
}
