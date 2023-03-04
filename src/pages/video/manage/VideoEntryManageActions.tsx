import { Dispatch } from "@reduxjs/toolkit";
import videoRenameBulkApi, { VideoRenameBulkParams } from 'src/api/video/admin/video-rename-bulk';
import { GlobalActions } from 'src/redux/global';
import videoEntryDetailApi from 'src/api/video/video-entry-detail';

export const videoEntryRenameAction = (entryId: string, params: VideoRenameBulkParams) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  await videoRenameBulkApi(params);

  videoEntryDetailApi.invalidate({ entryId });

  dispatch(GlobalActions.update({ loading: false }));
};
