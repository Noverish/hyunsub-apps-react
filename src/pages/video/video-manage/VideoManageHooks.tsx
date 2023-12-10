import videoSubtitleSyncApi, { VideoSubtitleSyncParams } from 'src/api/video/video-manage/video-subtitle-sync';
import { useUrlParams } from 'src/hooks/url-params';
import { VideoAdminActions } from 'src/pages/video/admin/VideoAdminState';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export interface VideoManagePageParams {
  videoId: string;
}

function usePageParams(): VideoManagePageParams {
  const [videoId] = useUrlParams('videoId');
  return { videoId };
}

function syncSubtitle() {
  return async (params: VideoSubtitleSyncParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    const result = await videoSubtitleSyncApi(params);
    dispatch(VideoAdminActions.update({ videoSubtitleSyncResult: result }));

    dispatch(GlobalActions.update({ loading: false }));
  };
}

const VideoManageHooks = {
  usePageParams,
  syncSubtitle,
};

export default VideoManageHooks;
