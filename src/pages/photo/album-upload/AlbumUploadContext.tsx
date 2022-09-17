import { Dispatch } from "@reduxjs/toolkit";
import uploadApi from "src/api/file/upload";
import albumUploadApi from "src/api/photo/album-upload";
import { RootState } from "src/redux";
import { AlbumUploadActions, PhotoUploadStatus } from "./AlbumUploadState";

export const prepareUploadAction = (files: File[]) => async (dispatch: Dispatch, getState: () => RootState) => {
  const statusList: PhotoUploadStatus[] = files.map((file) => ({
    name: file.name,
    progress: 0,
  }))
  dispatch(AlbumUploadActions.update({ statusList }));
}

export const albumUploadAction = (files: File[], albumId: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = file.name;

    const { nonce } = await uploadApi({
      file,
      progress: (precent) => {
        dispatch(AlbumUploadActions.updateStatus({
          index: i,
          status: { progress: precent },
        }))
      }
    });

    try {
      const photo = await albumUploadApi({ albumId, fileName, nonce });

      dispatch(AlbumUploadActions.updateStatus({
        index: i,
        status: { progress: 100, photo },
      }))
    } catch (ex) {
      dispatch(AlbumUploadActions.updateStatus({
        index: i,
        status: { progress: -1 },
      }))
    }
  }
}
