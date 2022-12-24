import { Dispatch } from '@reduxjs/toolkit';
import driveListApi from 'src/api/drive/drive-list';
import driveMoveBulkApi from 'src/api/drive/drive-move-bulk';
import { DriveMoveBulkParams } from 'src/api/drive/drive-move-bulk';
import { RootState } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export const driveMoveBulkAction = (params: DriveMoveBulkParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  if (params.from === params.to) {
    return;
  }

  dispatch(GlobalActions.update({ loading: true }));
  await driveMoveBulkApi(params);
  driveListApi.invalidate({ path: params.from });
  driveListApi.invalidate({ path: params.to });
  dispatch(GlobalActions.update({ loading: false }));
};
