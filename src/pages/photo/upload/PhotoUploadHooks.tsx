import { t } from 'i18next';
import { basename } from 'path-browserify';
import { useContext } from 'react';

import fileUploadApi from 'src/api/file/file-upload-multipart';
import albumDetailApi from 'src/api/photo/album-detail';
import albumPhotosApi from 'src/api/photo/album-photos';
import usePhotoUploadApi, { PhotoProcessResult } from 'src/api/photo/photo-upload';
import { FileUploadItemResult, FileUploadProgress, FileWithPath } from 'src/model/file';
import { PhotoUploadItemInfo } from 'src/model/photo';
import { PhotoUploadContext } from 'src/pages/photo/upload/PhotoUploadContext';
import { generateRandomString } from 'src/utils';
import { useContextSetter } from 'src/utils/context';

let finishNum = 0;
let errorExist = false;

function useReady() {
  const setState = useContextSetter(PhotoUploadContext);

  return (files: FileWithPath[]) => {
    const items: PhotoUploadItemInfo[] = files.map((file) => ({
      file,
      status: 'ready',
      progress: 0,
      nonce: `photo_${generateRandomString(16)}`,
      errMsg: null,
      preview: null,
    }));

    setState({ status: 'ready', items, progress: 0, controller: undefined });
  };
}

function useUpload(albumId?: string) {
  const [{ items }, setState] = useContext(PhotoUploadContext);
  const process = useProcess(albumId);

  const progress = (status: FileUploadProgress) => {
    setState((state) => {
      state.progress = status.total.ratio;
      const item = state.items[status.current.index];
      if (item) {
        item.progress = status.current.ratio;
      }
    });
  };

  const callback = ({ status, fileName }: FileUploadItemResult) => {
    setState((state) => {
      const item = state.items.filter((v) => v.nonce === fileName)[0];
      if (item) {
        item.status = status;
        item.progress = 100;

        if (status !== 'uploaded') {
          state.status = 'error';
          errorExist = true;
        }
      }
    });

    if (status === 'uploaded') {
      process(fileName);
    }
  };

  return async () => {
    const controller = new AbortController();

    finishNum = 0;
    errorExist = false;
    setState((state) => {
      state.status = 'uploading';
      state.items.forEach((v) => (v.status = 'uploading'));
      state.controller = controller;
      state.progress = 0;
    });

    const files: FileWithPath[] = items.map((v) => ({
      ...v.file,
      path: v.nonce,
    }));

    await fileUploadApi({ files, progress, callback, controller });
  };
}

function useProcess(albumId?: string) {
  const [{ items }, setState] = useContext(PhotoUploadContext);

  const callback = (result: PhotoProcessResult) => {
    finishNum += 1;
    setState((state) => {
      const item = state.items.filter((v) => v.nonce === result.nonce)[0];
      if (result.success) {
        item.status = 'success';
        item.preview = result.preview;
      } else {
        item.status = 'error';
        item.errMsg = result.errMsg;
        errorExist = true;
      }
      if (finishNum === state.items.length) {
        if (errorExist) {
          state.status = 'error';
        } else {
          state.status = 'success';
        }
      }
    });
    if (finishNum === items.length) {
      albumDetailApi.invalidate();
      albumPhotosApi.invalidate();
    }
  };

  const photoProcessApi = usePhotoUploadApi({ callback });

  return (nonce: string) => {
    const item = items.filter((v) => v.nonce === nonce)[0];
    photoProcessApi({
      nonce,
      albumId,
      name: basename(item.file.path),
      millis: item.file.file.lastModified,
    });
  };
}

function useClear() {
  const setState = useContextSetter(PhotoUploadContext);

  return () => {
    setState({ status: 'ready', items: [], progress: 0, controller: undefined });
  };
}

function useAbort() {
  const [{ controller }, setState] = useContext(PhotoUploadContext);

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

const PhotoUploadHooks = {
  useReady,
  useUpload,
  useAbort,
  useClear,
};

export default PhotoUploadHooks;
