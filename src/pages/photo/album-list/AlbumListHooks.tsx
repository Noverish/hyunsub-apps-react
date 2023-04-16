import albumCreateApi, { AlbumCreateParams } from "src/api/photo/album-create";
import albumListApi from "src/api/photo/album-list";
import { dispatch } from "src/redux";
import { GlobalActions } from "src/redux/global";

export function useAlbumCreate() {
  return async (params: AlbumCreateParams) => {
    dispatch(GlobalActions.update({ loading: true }));

    const result = await albumCreateApi(params);

    albumListApi.updateCache({}, (cache) => {
      cache.splice(0, 0, result);
    })

    dispatch(GlobalActions.update({ loading: false }));
  }
}
