import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "src/redux";
import { GlobalActions } from "src/redux/global";
import getVideoDetail from "src/api/video/video-entry-detail";
import VideoRoutes from 'src/pages/video/VideoRoutes';
import router from 'src/pages/router';

interface LoadOtherEpisodeParams {
  entryId: string;
  videoId: string;
}

export const loadOtherEpisode = ({ entryId, videoId }: LoadOtherEpisodeParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  const cache = getVideoDetail.cache({ entryId, videoId });
  if (!cache) {
    dispatch(GlobalActions.update({ loading: true }));
    await getVideoDetail.prefetch({ entryId, videoId });
    dispatch(GlobalActions.update({ loading: false }));
  }
  router.navigate(VideoRoutes.getDetailRoute(entryId, videoId));
}
