import { Dispatch } from '@reduxjs/toolkit';

import entryRenameApi, { EntryRenameParams } from 'src/api/video/entry-manage/entry-rename';
import videoEntryDetailApi from 'src/api/video/video-entry-detail';
import { GlobalActions } from 'src/redux/global';

export const videoEntryRenameAction = (entryId: string, params: EntryRenameParams) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  await entryRenameApi({ ...params, entryId });

  videoEntryDetailApi.invalidate({ entryId });

  dispatch(GlobalActions.update({ loading: false }));
};
