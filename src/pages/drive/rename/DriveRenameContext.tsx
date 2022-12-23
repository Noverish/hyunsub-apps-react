import { Dispatch } from "@reduxjs/toolkit";
import driveListApi from "src/api/drive/drive-list";
import driveRenameBulkApi, { DriveRenameBulkParamsData } from "src/api/drive/drive-rename-bulk";
import { RootState } from "src/redux";
import { GlobalActions } from "src/redux/global";
import { DriveActions } from "../DriveRedux";
import { getDriveStatus } from 'src/pages/drive/DriveHooks';

export const resetAction = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const { path } = getDriveStatus();
  const list = driveListApi.cache({ path });
  dispatch(DriveActions.update({ renames: list }));
};

export const replaceAction = (from: string, to: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  const prev = getState().drive.renames;
  const regex = new RegExp(from);

  const next = prev.map(v => ({
    ...v,
    name: v.name.replace(regex, to),
  }));

  dispatch(DriveActions.update({ renames: next }));
}

export const addNumberAction = (front: boolean, startNum: number, padNum: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  const prev = getState().drive.renames;

  const next = prev.map((v, i) => {
    const num = (startNum + i).toString().padStart(padNum, '0');
    const newName = (front ? num : '') + v.name + (!front ? num : '');

    return {
      ...v,
      name: newName,
    }
  });

  dispatch(DriveActions.update({ renames: next }));
};

export const padNumberAction = (padNum: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  const prev = getState().drive.renames;

  const next = prev.map((v) => {
    const newName = v.name.replace(/\d+/, (m) => m.padStart(padNum, '0'));

    return {
      ...v,
      name: newName,
    }
  });

  dispatch(DriveActions.update({ renames: next }));
};

export const renameBulkAction = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(GlobalActions.update({ loading: true }));

  const { path } = getDriveStatus();
  const prev = driveListApi.cache({ path });
  if (!prev) {
    return;
  }

  const next = getState().drive.renames;

  const renames: DriveRenameBulkParamsData[] = [];
  for(let i = 0; i < prev?.length; i++) {
    const from = prev[i].name;
    const to = next[i].name;
    if (from !== to) {
      renames.push({ from, to });
    }
  }

  await driveRenameBulkApi({ path, renames });

  const newList = await driveListApi.fetch({ path }, true);

  dispatch(DriveActions.update({ renames: newList }));
  dispatch(GlobalActions.update({ loading: false }));
};
