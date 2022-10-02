import { Dispatch } from '@reduxjs/toolkit';
import apparelAdd from 'src/api/apparel/apparel-add';
import { Apparel } from 'src/model/apparel';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import history from 'src/pages/common/history';
import { GlobalActions } from 'src/redux/global';

export const apparelAddAction = (apparel: Apparel) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));
  const result = await apparelAdd(apparel);
  dispatch(GlobalActions.update({ loading: false }));
  history.push(ApparelRoutes.detailRoute(result.id));
}