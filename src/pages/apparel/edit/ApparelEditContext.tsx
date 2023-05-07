import { Dispatch } from '@reduxjs/toolkit';

import apparelImageDeleteApi from 'src/api/apparel/apparel-image-delete';
import apparelImageUploadApi from 'src/api/apparel/apparel-image-upload';
import apparelUpdateApi from 'src/api/apparel/apparel-update';
import { Apparel, ApparelImage } from 'src/model/apparel';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import router from 'src/pages/router';
import { GlobalActions } from 'src/redux/global';

export const apparelImageUploadAction = (apparelId: string, images: File[]) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  for (const image of images) {
    await apparelImageUploadApi({ apparelId, image });
  }

  dispatch(GlobalActions.update({ loading: false }));
};

export const apparelImageDeleteAction = (image: ApparelImage) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  await apparelImageDeleteApi(image);

  dispatch(GlobalActions.update({ loading: false }));
};

export const apparelUpdateAction = (apparelId: string, apparel: Apparel) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  const result = await apparelUpdateApi({ apparelId, apparel });

  dispatch(GlobalActions.update({ loading: false }));

  router.navigate(ApparelRoutes.detail(result.id));
};
