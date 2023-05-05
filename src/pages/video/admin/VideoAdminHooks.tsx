import videoEntryCreateApi, { VideoEntryCreateParams } from "src/api/video/admin/video-entry-create";
import router from "src/pages/router";
import { dispatch } from "src/redux";
import { GlobalActions } from "src/redux/global";
import VideoRoutes from "../VideoRoutes";

export function useVideoEntryCreate() {
  return async (params: VideoEntryCreateParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    const result = await videoEntryCreateApi(params);

    dispatch(GlobalActions.update({ loading: false }));

    router.navigate(VideoRoutes.detailRoute(result.id));
  }
}
