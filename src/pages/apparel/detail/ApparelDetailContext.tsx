import { Dispatch } from '@reduxjs/toolkit';
import { t } from 'i18next';

import ApparelRoutes from '../ApparelRoutes';
import apparelDeleteApi from 'src/api/apparel/apparel-delete';
import apparelDetailApi from 'src/api/apparel/apparel-detail';
import apparelListApi from 'src/api/apparel/apparel-list';
import router from 'src/pages/router';
import { GlobalActions } from 'src/redux/global';

export const apparelDeleteAction = (apparelId: string) => async (dispatch: Dispatch) => {
  if (!window.confirm(t('msg.delete-confirm') as string)) {
    return;
  }

  dispatch(GlobalActions.update({ loading: true }));
  await apparelDeleteApi(apparelId);
  dispatch(GlobalActions.update({ loading: false }));

  apparelDetailApi.clearCache({ apparelId });
  apparelListApi.deleteCache({}, (v) => v.id === apparelId);

  router.navigate(ApparelRoutes.list);
};
