import { Dispatch } from "@reduxjs/toolkit";
import getVideoDetail from "src/api/video/video-entry-detail";
import router from 'src/pages/router';
import { GlobalActions } from "src/redux/global";
import VideoRoutes from "../VideoRoutes";

export const loadVideoDetail = (entryId: string) => async (dispatch: Dispatch) => {
  const cache = getVideoDetail.cache({ entryId });
  if (!cache) {
    dispatch(GlobalActions.update({ loading: true }));
    await getVideoDetail.fetch({ entryId });
    dispatch(GlobalActions.update({ loading: false }));
  }
  router.navigate(VideoRoutes.getDetailRoute(entryId, undefined));
};
