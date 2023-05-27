import { Dispatch } from '@reduxjs/toolkit';

import videoEntryDetailApi from 'src/api/video/video-entry-detail';
import router from 'src/pages/router';
import VideoRoutes from 'src/pages/video/VideoRoutes';
import { RootState } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

interface LoadOtherEpisodeParams {
  entryId: string;
  videoId: string;
}

export const loadOtherEpisode =
  ({ entryId, videoId }: LoadOtherEpisodeParams) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const cache = videoEntryDetailApi.cache({ entryId, videoId });
    if (!cache) {
      dispatch(GlobalActions.update({ loading: true }));
      await videoEntryDetailApi.prefetch({ entryId, videoId });
      dispatch(GlobalActions.update({ loading: false }));
    }
    router.navigate(VideoRoutes.detail({ entryId, videoId }));
  };
