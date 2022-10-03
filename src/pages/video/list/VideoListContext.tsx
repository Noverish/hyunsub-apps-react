import { Dispatch } from "@reduxjs/toolkit";
import getVideoDetail from "src/api/video/video-entry-detail";
import history from 'src/pages/common/history';
import { GlobalActions } from "src/redux/global";
import VideoRoutes from "../VideoRoutes";

export const loadVideoDetail = (entryId: string) => async (dispatch: Dispatch) => {
  const cache = getVideoDetail.cache({ entryId });
  if (!cache) {
    dispatch(GlobalActions.update({ loading: true }));
    await getVideoDetail.fetch({ entryId });
    dispatch(GlobalActions.update({ loading: false }));
  }
  history.push(VideoRoutes.getDetailRoute(entryId, undefined));
};
