import { Dispatch } from "@reduxjs/toolkit";
import apparelDelete from "src/api/apparel/apparel-delete";
import apparelImageUpload from "src/api/apparel/apparel-image-upload";
import { GlobalActions } from 'src/redux/global';
import router from 'src/pages/router';
import { t } from 'i18next';
import apparelList from "src/api/apparel/apparel-list";

export const apparelImageUploadAction = (apparelId: string, images: File[]) => async (dispatch: Dispatch) => {
  for (const image of images) {
    const result = await apparelImageUpload({ apparelId, image });
  }
}

export const apparelDeleteAction = (apparelId: string) => async (dispatch: Dispatch) => {
  if (!window.confirm(t('msg.delete-confirm') as string)) {
    return;
  }

  dispatch(GlobalActions.update({ loading: true }));
  await apparelDelete(apparelId);
  alert(t('msg.delete-success'));
  dispatch(GlobalActions.update({ loading: false }));

  apparelList.updateCache({}, list => list.filter(v => v.id !== apparelId));

  router.navigate(-1);
}
