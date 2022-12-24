import { Dispatch } from '@reduxjs/toolkit';
import driveListApi from 'src/api/drive/drive-list';
import { RootState } from 'src/redux';
import { getDriveStatus } from 'src/pages/drive/DriveHooks';
import { DriveActions } from 'src/pages/drive/DriveRedux';
import fileRemoveApi from 'src/api/file/file-remove';
import t from 'src/i18n';
import { GlobalActions } from 'src/redux/global';
import { join } from 'src/utils/path';

export const keyboardAction = (e: KeyboardEvent) => async (dispatch: Dispatch, getState: () => RootState) => {
  const path = getState().drive.status[0]?.path || '/';
  const file = getState().drive.status[0]?.lastSelect;
  const list = driveListApi.cache({ path }) || [];

  if (!file) {
    const firstFile = list[0];
    if (firstFile) {
      dispatch(DriveActions.updateStatus({ selects: [firstFile.name], lastSelect: firstFile }));
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
      dispatch(DriveActions.updateStatus({ selects: [newFile.name], lastSelect: newFile }));
    }
    return;
  }

  if (e.key === 'ArrowUp') {
    const newFile = list[index - 1];
    if (newFile) {
      dispatch(DriveActions.updateStatus({ selects: [newFile.name],lastSelect: newFile }));
    }
    return;
  }
};

export const nextAudioAction = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const { path, lastSelect: file } = getDriveStatus();
  const list = driveListApi.cache({ path }) || [];
  const audios = list.filter(v => v.name.endsWith('.mp3'));

  if (!file) {
    return;
  }

  const index = audios.indexOf(file);
  const nextAudio = audios[index + 1];
  if (nextAudio) {
    dispatch(DriveActions.updateStatus({ selects: [nextAudio.name], lastSelect: nextAudio }));
  }
}

export const driveRemoveAction = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const { path, lastSelect: file } = getDriveStatus();
  if (!file) {
    return;
  }

  if (!window.confirm(t('drive.msg.remove-confirm') as string)) {
    return;
  }

  const filePath = join(path, file.name);

  dispatch(GlobalActions.update({ loading: true }));
  await fileRemoveApi({ path: filePath });
  driveListApi.invalidate({ path });
  dispatch(DriveActions.updateStatus({ path }));
  dispatch(GlobalActions.update({ loading: false }));
}
