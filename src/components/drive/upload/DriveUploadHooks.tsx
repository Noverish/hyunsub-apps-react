import { t } from 'i18next';
import { join } from 'path-browserify';
import { useContext } from 'react';

import driveListApi from 'src/api/drive/drive-list';
import fileUploadMultipartApi from 'src/api/file/file-upload-multipart';
import { useDriveExplorerContext } from 'src/components/drive/explorer/DriveExplorerHooks';
import { DriveUploadContext } from 'src/components/drive/upload/DriveUploadContext';
import { FileUploadResult, FileUploadStatus, FileWithPath } from 'src/model/file';
import { dateToString, getHumanReadableSize } from 'src/utils';

export function useDriveUpload() {
  const { path } = useDriveExplorerContext();
  const setState = useContext(DriveUploadContext)[1];

  return async (files: FileWithPath[]) => {
    files.forEach((v) => (v.path = join(path, v.path)));

    files.sort((a, b) => a.path.localeCompare(b.path));

    const items = files.map((v) => ({
      path: v.path,
      name: v.file.name,
      size: v.file.size,
      type: v.file.type,
      progress: 0,
    }));

    const controller = new AbortController();

    setState({ items, controller, aborted: false, progress: 0 });

    const progress = (status: FileUploadStatus) => {
      const data = files[status.current.index];

      setState((state) => {
        state.progress = status.total.ratio;
        state.items.forEach((v) => {
          if (v.path === data.path) {
            v.progress = status.current.ratio;
          }
        });
      });
    };

    const callback = (result: FileUploadResult) => {
      const data = files[result.index];

      setState((state) => {
        state.items.forEach((v) => {
          if (v.path === data.path) {
            v.progress = 100;
          }
        });
      });

      driveListApi.updateCache({ path }, (cache) => {
        cache.push({
          name: data.file.name,
          size: getHumanReadableSize(data.file.size),
          date: dateToString(new Date()),
          isDir: false,
        });
      });
    };

    await fileUploadMultipartApi({ files, progress, callback, controller });

    setState({ controller: undefined });

    driveListApi.invalidate({ path });
  };
}

export function useDriveUploadClear() {
  const setState = useContext(DriveUploadContext)[1];

  return () => {
    setState({ items: [], progress: 0, controller: undefined, aborted: false });
  };
}

export function useDriveUploadClose() {
  const [{ controller }, setState] = useContext(DriveUploadContext);
  const clear = useDriveUploadClear();

  return () => {
    if (controller) {
      if (window.confirm(t('drive.DriveUploadModal.abort-msg'))) {
        controller.abort();
        setState({ controller: undefined, aborted: true });
      }
    } else {
      clear();
    }
  };
}
