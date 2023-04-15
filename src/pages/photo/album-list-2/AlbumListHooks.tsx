import albumCreateApi, { AlbumCreateParams } from "src/api/photo/album-create";
import albumListV2Api from "src/api/photo/album-list-v2";
import { dispatch } from "src/redux";
import { GlobalActions } from "src/redux/global";

export function useAlbumCreate() {
  return async (params: AlbumCreateParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    const result = await albumCreateApi(params);

    albumListV2Api.updateCache({}, (cache) => {
      cache.splice(0, 0, result);
    })

    dispatch(GlobalActions.update({ loading: false }));
  }
}
