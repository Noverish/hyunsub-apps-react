import { useContext } from 'react';

import { VideoManageContext } from './VideoManageContext';
import videoEncodeApi, { VideoEncodeParams } from 'src/api/video/video-manage/video-encode';
import videoMetadataApi from 'src/api/video/video-manage/video-metadata';
import videoRenameApi, { VideoRenameParams } from 'src/api/video/video-manage/video-rename';
import videoSubtitleApi, { VideoSubtitleParams } from 'src/api/video/video-manage/video-subtitle';
import videoSubtitleSyncApi, { VideoSubtitleSyncParams } from 'src/api/video/video-manage/video-subtitle-sync';
import videoThumbnailApi from 'src/api/video/video-manage/video-thumbnail';
import { useUrlParams } from 'src/hooks/url-params';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface VideoManagePageParams {
  entryId: string;
  videoId: string;
}

function usePageParams(): VideoManagePageParams {
  const [entryId, videoId] = useUrlParams('entryId', 'videoId');
  return { entryId, videoId };
}

function useUploadSubtitle() {
  const setState = useContext(VideoManageContext)[1];

  return async (params: VideoSubtitleParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    const result = await videoSubtitleApi(params);
    setState({ videoSubtitleUploadResult: result });

    dispatch(GlobalActions.update({ loading: false }));
  };
}

function useSyncSubtitle() {
  const setState = useContext(VideoManageContext)[1];

  return async (params: VideoSubtitleSyncParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    const result = await videoSubtitleSyncApi(params);
    setState({ videoSubtitleSyncResult: result });

    dispatch(GlobalActions.update({ loading: false }));
  };
}

function useRename() {
  const setState = useContext(VideoManageContext)[1];

  return async (params: VideoRenameParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    const result = await videoRenameApi(params);
    setState({ videoRenameResult: result });

    dispatch(GlobalActions.update({ loading: false }));
  };
}

function useEncode() {
  const setState = useContext(VideoManageContext)[1];

  return async (params: VideoEncodeParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    const result = await videoEncodeApi(params);
    setState({ videoEncodeResult: result });

    dispatch(GlobalActions.update({ loading: false }));
  };
}

function useScanMetadata() {
  const setState = useContext(VideoManageContext)[1];

  return async (videoId: string) => {
    dispatch(GlobalActions.update({ loading: true }));

    const result = await videoMetadataApi({ videoId });
    setState({ videoMetadataResult: result });

    dispatch(GlobalActions.update({ loading: false }));
  };
}

function useGenerateThumbnail() {
  const setState = useContext(VideoManageContext)[1];

  return async (videoId: string) => {
    dispatch(GlobalActions.update({ loading: true }));

    const result = await videoThumbnailApi({ videoId });
    setState({ videoThumbnailResult: result });

    dispatch(GlobalActions.update({ loading: false }));
  };
}

const VideoManageHooks = {
  usePageParams,
  useUploadSubtitle,
  useSyncSubtitle,
  useRename,
  useEncode,
  useScanMetadata,
  useGenerateThumbnail,
};

export default VideoManageHooks;
