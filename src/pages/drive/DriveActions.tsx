import { Dispatch } from "@reduxjs/toolkit";
import { groupBy } from "lodash";
import React from "react";
import driveListApi from "src/api/drive/drive-list";
import driveNewFolderApi from "src/api/drive/drive-new-folder";
import fileUploadMultipartApi from "src/api/file/file-upload-multipart";
import { DriveFileInfo } from "src/model/drive";
import { FileWithPath } from "src/model/file";
import { RootState } from "src/redux";
import { GlobalActions } from "src/redux/global";
import { dirname, join } from 'path-browserify';
import { isMac } from "src/utils/user-agent";
import { getDriveStatus } from './DriveHooks';
import { DriveActions } from './DriveRedux';
import driveUploadSessionApi from "src/api/drive/drive-upload-session";

export const driveUploadAction = (path: string, files: FileWithPath[]) => async (dispatch: Dispatch, getState: () => RootState) => {
  files.sort((a, b) => a.path.localeCompare(b.path));

  const newUploads = files.map(v => ({ path: v.path, progress: 0 }));

  const { uploads } = getState().drive;
  dispatch(DriveActions.update({ uploads: [...uploads, ...newUploads] }))

  const fileMap = groupBy(files, v => dirname(v.path));

  for (const [parent, children] of Object.entries(fileMap)) {
    const parentPath = join(path, parent);
    const sessionKey = (await driveUploadSessionApi({ path: parentPath })).sessionKey;

    for (const file of children) {
      await fileUploadMultipartApi({ sessionKey, files: [file.file] })
      dispatch(DriveActions.updateUpload({ path: file.path, progress: 100 }));
    }
  }

  driveListApi.invalidate({ path });
}

export const driveNewFolderAction = (index: number, name: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(GlobalActions.update({ loading: true }));
  const { path } = getDriveStatus(index);
  const folderPath = path + '/' + name;
  await driveNewFolderApi({ path: folderPath });
  driveListApi.invalidate({ path });
  dispatch(GlobalActions.update({ loading: false }));
};

export const driveFileClickAction = (index: number, info: DriveFileInfo, e: React.MouseEvent<HTMLDivElement>) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { path, selects, lastSelect, lastSelectTime } = getDriveStatus(index);

  const list = driveListApi.cache({ path })!!.map(v => v.name);
  const fileIndex = list.indexOf(info.name);

  const ctrlKey = (isMac() && e.metaKey) || (!isMac() && e.ctrlKey);
  if (ctrlKey) {
    if (selects.includes(info.name)) {
      const newSelect = selects.filter(v => v !== info.name);
      dispatch(DriveActions.updateStatus({ index, selects: newSelect }));
    } else {
      const newSelect = [...selects, info.name];
      dispatch(DriveActions.updateStatus({ index, selects: newSelect, lastSelect: info }));
    }
    return;
  }

  if (e.shiftKey && lastSelect) {
    const lastSelectIndex = list.indexOf(lastSelect.name);

    const selectIndice = selects.map(v => list.indexOf(v)).sort((a, b) => a - b);
    const selectIndexChunk: number[][] = [[]];
    for (let i = 0; i < selectIndice.length; i++) {
      const prev = selectIndice[i - 1];
      const curr = selectIndice[i];
      const lastChunk = selectIndexChunk[selectIndexChunk.length - 1];
      if (i === 0 || curr - prev === 1) {
        lastChunk.push(curr);
      } else {
        selectIndexChunk.push([curr]);
      }
    }
    const lastSelectChunk = selectIndexChunk.filter(v => v.includes(lastSelectIndex))[0];
    selectIndexChunk.splice(selectIndexChunk.indexOf(lastSelectChunk), 1);
    const selects2 = selectIndexChunk.flatMap(v => v).map(v => list[v]);

    const [from, to] = [fileIndex, lastSelectIndex].sort((a, b) => a - b);
    const newSelects = list.slice(from, to + 1);
    const set = new Set([...selects2, ...newSelects]);

    dispatch(DriveActions.updateStatus({ index, selects: Array.from(set) }));
    return;
  }

  const now = new Date().getTime();
  if (lastSelect?.name === info.name && info.type === 'FOLDER' && lastSelectTime && now - lastSelectTime < 500) {
    if (info.name === '../') {
      dispatch(DriveActions.updateStatus({ index, path: dirname(path) }));
    } else {
      dispatch(DriveActions.updateStatus({ index, path: join(path, info.name) }));
    }
    return;
  }

  dispatch(DriveActions.updateStatus({ index, selects: [info.name], lastSelect: info }));
};
