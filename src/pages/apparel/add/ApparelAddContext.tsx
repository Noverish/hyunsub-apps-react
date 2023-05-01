import { Dispatch } from '@reduxjs/toolkit';
import apparelAddApi from 'src/api/apparel/apparel-add';
import { Apparel } from 'src/model/apparel';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import router from 'src/pages/router';
import { GlobalActions } from 'src/redux/global';

export const apparelAddAction = (apparel: Apparel) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));
  const result = await apparelAddApi(apparel);
  dispatch(GlobalActions.update({ loading: false }));
  router.navigate(ApparelRoutes.detail(result.id));
}
