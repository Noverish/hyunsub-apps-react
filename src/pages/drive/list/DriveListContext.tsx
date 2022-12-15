import { Dispatch } from "@reduxjs/toolkit";
import { join } from 'path-browserify';
import driveListApi from "src/api/drive/drive-list";
import driveTextGetApi from "src/api/drive/drive-text-get";
import fileUploadRenameApi from "src/api/file/file-upload-rename";
import uploadApi from "src/api/file/upload";
import { FileWithPath } from "src/model/file";
import { dispatch, RootState } from "src/redux";
import { getPath } from '../DriveHooks';
import { DriveActions } from '../DriveRedux';

export const keyboardAction = (e: KeyboardEvent) => async (dispatch: Dispatch, getState: () => RootState) => {
  const path = getPath();
  const { file } = getState().drive;
  const list = driveListApi.cache({ path }) || [];

  if (!file) {
    const firstFile = list[0];
    if (firstFile) {
      dispatch(DriveActions.update({ file: firstFile }));
    }
    return;
  }

  const index = list.indexOf(file);
  if (index < 0) {
    return;
  }

  if (e.key === 'ArrowDown') {
    const newFile = list[index + 1];
    if (newFile) {
      dispatch(DriveActions.update({ file: newFile }));
    }
    return;
  }

  if (e.key === 'ArrowUp') {
    const newFile = list[index - 1];
    if (newFile) {
      dispatch(DriveActions.update({ file: newFile }));
    }
    return;
  }
};

export const nextAudioAction = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const path = getPath();
  const { file } = getState().drive;
  const list = driveListApi.cache({ path }) || [];
  const audios = list.filter(v => v.name.endsWith('.mp3'));

  if (!file) {
    return;
  }

  const index = audios.indexOf(file);
  const nextAudio = audios[index + 1];
  if (nextAudio) {
    dispatch(DriveActions.update({ file: nextAudio }));
  }
}

export const textFileSelectAction = () => async (dispath: Dispatch, getState: () => RootState) => {
  const path = getPath();
  const { file } = getState().drive;

  if (!file || file.type !== 'TEXT') {
    return;
  }

  dispatch(DriveActions.update({ text: undefined }));

  const filePath = path + '/' + file.name;

  const text = await driveTextGetApi.api({ path: filePath });

  dispatch(DriveActions.update({ text }));
}

export const driveUploadAction = (files: FileWithPath[]) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { uploads } = getState().drive;
  const currentPath = getPath();

  files.sort((a, b) => a.path.localeCompare(b.path));

  const newUploads = files.map(v => ({
    path: v.path,
    progress: 0,
  }))

  dispatch(DriveActions.update({ uploads: [...uploads, ...newUploads] }))

  for (const file of files) {
    const { nonce } = await uploadApi({
      file: file.file,
      progress: (progress: number) => {
        dispatch(DriveActions.updateUpload({ progress, path: file.path }));
      }
    })

    dispatch(DriveActions.updateUpload({ progress: 100, path: file.path }));

    await fileUploadRenameApi({
      nonce,
      path: join(currentPath, file.path),
    })
  }
}
