import { Dispatch } from '@reduxjs/toolkit';

import VideoRoutes from '../VideoRoutes';
import videoEntryCreateApi, { VideoEntryCreateParams } from 'src/api/video/admin/video-entry-create';
import videoRegister, { VideoRegisterParams } from 'src/api/video/admin/video-register';
import router from 'src/pages/router';
import { VideoAdminActions } from 'src/pages/video/admin/VideoAdminState';
import { GlobalActions } from 'src/redux/global';

export const videoRegisterAction = (params: VideoRegisterParams) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  const videoRegisterResult = await videoRegister(params);
  dispatch(VideoAdminActions.update({ videoRegisterResult }));

  dispatch(GlobalActions.update({ loading: false }));
};

export const videoRegisterToEntryAction = (params: VideoRegisterParams) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  const videoRegisterToEntryResult = await videoRegister(params);
  dispatch(VideoAdminActions.update({ videoRegisterToEntryResult }));

  dispatch(GlobalActions.update({ loading: false }));
};

export const videoEntryCreateAction = (params: VideoEntryCreateParams) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  const result = await videoEntryCreateApi(params);
  router.navigate(VideoRoutes.entryManage(result.id));

  dispatch(GlobalActions.update({ loading: false }));
};
