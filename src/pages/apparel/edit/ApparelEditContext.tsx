import { Dispatch } from '@reduxjs/toolkit';
import apparelImageDelete from 'src/api/apparel/apparel-image-delete';
import apparelImageUpload from 'src/api/apparel/apparel-image-upload';
import apparelUpdate from 'src/api/apparel/apparel-update';
import { Apparel, ApparelImage } from 'src/model/apparel';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import router from 'src/pages/router';
import { GlobalActions } from 'src/redux/global';

export const apparelImageUploadAction = (apparelId: string, images: File[]) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  for (const image of images) {
    await apparelImageUpload({ apparelId, image });
  }

  dispatch(GlobalActions.update({ loading: false }));
}

export const apparelImageDeleteAction = (image: ApparelImage) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  await apparelImageDelete(image);

  dispatch(GlobalActions.update({ loading: false }));
}

export const apparelUpdateAction = (apparelId: string, apparel: Apparel) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  const result = await apparelUpdate({ apparelId, apparel });

  dispatch(GlobalActions.update({ loading: false }));

  router.navigate(ApparelRoutes.detailRoute(result.id));
}
