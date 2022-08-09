import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "src/redux";
import { GlobalActions } from "src/redux/global";
import { prefetchVideoDetail, getVideoDetailCache } from "src/api/video/video-entry-detail";
import VideoRoutes from 'src/pages/video/VideoRoutes';
import videoHistory from 'src/pages/video/VideoHistory';

interface LoadOtherEpisodeParams {
  entryId: string;
  videoId: string;
}

export const loadOtherEpisode = ({ entryId, videoId }: LoadOtherEpisodeParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  const cache = getVideoDetailCache({ entryId, videoId });
  if (!cache) {
    dispatch(GlobalActions.update({ loading: true }));
    await prefetchVideoDetail({ entryId, videoId });
    dispatch(GlobalActions.update({ loading: false }));
  }
  videoHistory.push(VideoRoutes.getDetailRoute(entryId, videoId));
}
