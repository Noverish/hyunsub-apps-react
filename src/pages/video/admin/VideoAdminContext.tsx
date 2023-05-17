import { Dispatch } from '@reduxjs/toolkit';

import VideoRoutes from '../VideoRoutes';
import videoEncodeApi, { VideoEncodeParams } from 'src/api/video/video-manage/video-encode';
import videoEntryCreateApi, { VideoEntryCreateParams } from 'src/api/video/admin/video-entry-create';
import videoMetadataApi from 'src/api/video/video-manage/video-metadata';
import videoRegister, { VideoRegisterParams } from 'src/api/video/admin/video-register';
import videoSubtitleApi, { VideoSubtitleParams } from 'src/api/video/video-manage/video-subtitle';
import videoThumbnailApi from 'src/api/video/video-manage/video-thumbnail';
import router from 'src/pages/router';
import { VideoAdminActions } from 'src/pages/video/admin/VideoAdminState';
import { RootState } from 'src/redux';
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

export const videoMetadataScanAction = (videoId: string) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  const videoMetadataScanResult = await videoMetadataApi({ videoId });
  dispatch(VideoAdminActions.update({ videoMetadataScanResult }));

  dispatch(GlobalActions.update({ loading: false }));
};

export const videoEncodeAction = (params: VideoEncodeParams) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  const videoEncodeResult = await videoEncodeApi(params);
  dispatch(VideoAdminActions.update({ videoEncodeResult }));

  dispatch(GlobalActions.update({ loading: false }));
};

export const videoSubtitleUploadAction = (params: VideoSubtitleParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(GlobalActions.update({ loading: true }));

  const videoSubtitleUploadResult = await videoSubtitleApi(params);
  dispatch(VideoAdminActions.update({ videoSubtitleUploadResult }));

  dispatch(GlobalActions.update({ loading: false }));
};

export const videoThumbnailAction = (videoId: string) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  const time = (document.querySelector('video') as HTMLVideoElement).currentTime;
  const videoThumbnailResult = await videoThumbnailApi({ videoId, time });
  dispatch(VideoAdminActions.update({ videoThumbnailResult }));

  dispatch(GlobalActions.update({ loading: false }));
};

export const videoEntryCreateAction = (params: VideoEntryCreateParams) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  const result = await videoEntryCreateApi(params);
  router.navigate(VideoRoutes.entryManage(result.id));

  dispatch(GlobalActions.update({ loading: false }));
};
