import { Dispatch } from "@reduxjs/toolkit";
import driveListApi from "src/api/drive/drive-list";
import { RootState } from "src/redux";
import { getPath } from "../DriveHooks";
import { DriveActions } from "../DriveRedux";

export const resetAction = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const path = getPath();
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

  const check = new Set(next.map(v => v.name));
  if (check.size !== next.length) {
    alert('has duplicates');
    return;
  }

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

  const check = new Set(next.map(v => v.name));
  if (check.size !== next.length) {
    alert('has duplicates');
    return;
  }

  dispatch(DriveActions.update({ renames: next }));
};

export const padNumberAction = (padNum: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  const prev = getState().drive.renames;
  const pad = ''.padStart(padNum, '0');

  const next = prev.map((v) => {
    const newName = v.name.replace(/\d+/, (m) => m.padStart(padNum, '0'));

    return {
      ...v,
      name: newName,
    }
  });

  const check = new Set(next.map(v => v.name));
  if (check.size !== next.length) {
    alert('has duplicates');
    return;
  }

  dispatch(DriveActions.update({ renames: next }));
};
