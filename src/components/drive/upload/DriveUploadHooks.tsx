import { t } from 'i18next';
import { join } from 'path-browserify';
import { useContext } from 'react';

import driveListApi from 'src/api/drive/drive-list';
import fileUploadApi from 'src/api/file/file-upload-multipart';
import { useDriveExplorerContext } from 'src/components/drive/explorer/DriveExplorerHooks';
import { DriveUploadContext } from 'src/components/drive/upload/DriveUploadContext';
import { useTokenPayload } from 'src/hooks/token';
import { DriveUploadItemInfo } from 'src/model/drive';
import { FileUploadItemResult, FileUploadProgress, FileWithPath } from 'src/model/file';
import { useContextSetter } from 'src/utils/context';

function useReady() {
  const setState = useContextSetter(DriveUploadContext);
  const { path } = useDriveExplorerContext();
  const { isAdmin, idNo } = useTokenPayload();

  return (files: FileWithPath[]) => {
    files.sort((a, b) => a.path.localeCompare(b.path));

    const root = isAdmin ? path : join(`/hyunsub/drive/${idNo}`, path);

    const items: DriveUploadItemInfo[] = files.map((file) => ({
      file,
      status: 'ready',
      progress: 0,
      root,
    }));

    setState({ status: 'ready', items, progress: 0, controller: undefined });
  };
}

function useUpload() {
  const [{ items }, setState] = useContext(DriveUploadContext);
  const { path } = useDriveExplorerContext();

  const progress = (status: FileUploadProgress) => {
    setState((state) => {
      state.progress = status.total.ratio;
      const item = state.items[status.current.index];
      if (item) {
        item.progress = status.current.ratio;
      } else {
        console.error(`[warning] upload progress item not exist: ${status.current.index}`);
      }
    });
  };

  const callback = ({ status, fileName }: FileUploadItemResult) => {
    setState((state) => {
      const item = state.items.filter((v) => join(v.root, v.file.path) === fileName)[0];
      if (item) {
        item.status = status;
        item.progress = 100;

        if (status !== 'uploaded') {
          state.status = 'error';
        }
      } else {
        console.error(`[warning] upload callack item not exist: ${fileName}`);
      }
    });
  };

  return async () => {
    const controller = new AbortController();

    setState((state) => {
      state.status = 'uploading';
      state.items.forEach((v) => (v.status = 'uploading'));
      state.controller = controller;
      state.progress = 0;
    });

    const files: FileWithPath[] = items.map((v) => ({
      ...v.file,
      path: join(v.root, v.file.path),
    }));

    await fileUploadApi({ files, progress, callback, controller });

    setState((state) => {
      if (state.status === 'uploading') {
        state.status = 'success';
      }
      state.progress = 100;
    });

    driveListApi.clearCache({ path });
  };
}

function useClear() {
  const setState = useContextSetter(DriveUploadContext);

  return () => {
    setState({ status: 'ready', items: [], progress: 0, controller: undefined });
  };
}

function useAbort() {
  const [{ controller }, setState] = useContext(DriveUploadContext);

  return () => {
    if (!controller) {
      return;
    }

    if (window.confirm(t('drive.DriveUploadModal.abort-msg'))) {
      controller.abort();
      setState({ status: 'aborted', controller: undefined });
    }
  };
}

const DriveUploadHooks = {
  useReady,
  useUpload,
  useAbort,
  useClear,
};

export default DriveUploadHooks;
