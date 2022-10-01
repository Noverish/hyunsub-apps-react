import { Dispatch } from '@reduxjs/toolkit';
import apparelDetail from 'src/api/apparel/apparel-detail';
import apparelImageDelete from 'src/api/apparel/apparel-image-delete';
import apparelImageUpload from 'src/api/apparel/apparel-image-upload';
import apparelUpdate from 'src/api/apparel/apparel-update';
import { Apparel, ApparelImage } from 'src/model/apparel';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import history from 'src/pages/common/history';
import { GlobalActions } from 'src/redux/global';

export const apparelImageUploadAction = (apparelId: string, images: File[]) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  for (const image of images) {
    const apparelImage = await apparelImageUpload({ apparelId, image });

    apparelDetail.setCache({ apparelId }, (cache) => {
      if (!cache) {
        return cache;
      }
      cache.images = [...cache.images, apparelImage];
      return cache;
    })
  }

  dispatch(GlobalActions.update({ loading: false }));
}

export const apparelImageDeleteAction = (image: ApparelImage) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  await apparelImageDelete(image);

  const apparelId = image.apparelId;
  apparelDetail.setCache({ apparelId }, (cache) => {
    if (!cache) {
      return cache;
    }
    cache.images = cache.images.filter(v => v.imageId !== image.imageId);
    return cache;
  })

  dispatch(GlobalActions.update({ loading: false }));
}

export const apparelUpdateAction = (apparelId: string, apparel: Apparel) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));

  const result = await apparelUpdate({ apparelId, apparel });
  apparelDetail.setCache({ apparelId }, result);

  dispatch(GlobalActions.update({ loading: false }));

  history.push(ApparelRoutes.detailRoute(result.id));
}
