import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "src/redux";
import { GlobalActions } from "src/redux/global";
import queryClient from 'src/api/query-client';
import { prefetchVideoDetail } from "src/api/video/video-entry-detail";
import { NavigateFunction } from "react-router-dom";
import { VideoEntryDetail } from "src/model/video";
import VideoRoutes from 'src/pages/video/VideoRoutes';

interface LoadOtherEpisodeParams {
  entryId: string;
  videoId: string;
  navigate: NavigateFunction;
}

export const loadOtherEpisode = ({ entryId, videoId, navigate }: LoadOtherEpisodeParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  const queryKey = `entry|${entryId}|${videoId}`;
  const cache = queryClient.getQueryData<VideoEntryDetail>(queryKey);
  if (!cache) {
    dispatch(GlobalActions.update({ loading: true }));
    await prefetchVideoDetail({ entryId, videoId });
    dispatch(GlobalActions.update({ loading: false }));
  }
  navigate(VideoRoutes.getDetailRoute(entryId, videoId));
}
