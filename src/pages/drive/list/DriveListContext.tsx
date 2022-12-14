
import { Dispatch } from "@reduxjs/toolkit";
import driveListApi from "src/api/drive/drive-list";
import driveTextGetApi from "src/api/drive/drive-text-get";
import { dispatch, RootState } from "src/redux";
import {DriveActions} from '../DriveRedux';

export const keyboardAction = (e: KeyboardEvent) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { path, file } = getState().drive;
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

export const textFileSelectAction = () => async (dispath: Dispatch, getState: () => RootState) => {
  const { path, file } = getState().drive;

  if (!file || file.type !== 'TEXT') {
    return;
  }

  dispatch(DriveActions.update({ text: undefined }));

  const filePath = path + '/' + file.name;

  const text = await driveTextGetApi.api({ path: filePath });

  dispatch(DriveActions.update({ text }));
}
