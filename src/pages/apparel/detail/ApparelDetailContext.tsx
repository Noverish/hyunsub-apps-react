import { Dispatch } from "@reduxjs/toolkit";
import apparelDeleteApi from "src/api/apparel/apparel-delete";
import apparelImageUploadApi from "src/api/apparel/apparel-image-upload";
import { GlobalActions } from 'src/redux/global';
import router from 'src/pages/router';
import { t } from 'i18next';
import apparelListApi from "src/api/apparel/apparel-list";

export const apparelImageUploadAction = (apparelId: string, images: File[]) => async (dispatch: Dispatch) => {
  for (const image of images) {
    await apparelImageUploadApi({ apparelId, image });
  }
}

export const apparelDeleteAction = (apparelId: string) => async (dispatch: Dispatch) => {
  if (!window.confirm(t('msg.delete-confirm') as string)) {
    return;
  }

  dispatch(GlobalActions.update({ loading: true }));
  await apparelDeleteApi(apparelId);
  alert(t('msg.delete-success'));
  dispatch(GlobalActions.update({ loading: false }));

  apparelListApi.updateCache({}, list => list.filter(v => v.id !== apparelId));

  router.navigate(-1);
}
