import { Dispatch } from '@reduxjs/toolkit';

import userAuthorityCreateApi, { PutUserAuthorityParams } from 'src/api/auth/admin/user-authority-create';
import userAuthorityDeleteApi, { DelUserAuthorityParams } from 'src/api/auth/admin/user-authority-delete';
import userDeleteApi from 'src/api/auth/admin/user-delete';
import userListApi from 'src/api/auth/admin/user-list';
import QueryClient from 'src/api/query-client';
import { AdminUser } from 'src/model/auth';
import { RootState } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export const putUserAuthorityAction =
  (params: PutUserAuthorityParams) => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(GlobalActions.update({ loading: true }));
    await userAuthorityCreateApi(params);
    QueryClient.setQueryData<AdminUser[]>(userListApi.key({}), (users) => {
      if (!users) {
        return [];
      }

      users.forEach((user) => {
        if (user.idNo === params.idNo) {
          user.authorities.push(params.authorityId);
        }
      });

      return users;
    });
    dispatch(GlobalActions.update({ loading: false }));
  };

export const delUserAuthorityAction =
  (params: DelUserAuthorityParams) => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(GlobalActions.update({ loading: true }));
    await userAuthorityDeleteApi(params);
    QueryClient.setQueryData<AdminUser[]>(userListApi.key({}), (users) => {
      if (!users) {
        return [];
      }

      users.forEach((user) => {
        if (user.idNo === params.idNo) {
          const i = user.authorities.indexOf(params.authorityId);
          user.authorities.splice(i, 1);
        }
      });

      return users;
    });
    dispatch(GlobalActions.update({ loading: false }));
  };

export const adminSignOutAction = (idNo: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(GlobalActions.update({ loading: true }));
  await userDeleteApi({ idNo });
  QueryClient.setQueryData<AdminUser[]>(userListApi.key({}), (users) => {
    if (!users) {
      return [];
    }
    return users.filter((v) => v.idNo !== idNo);
  });
  dispatch(GlobalActions.update({ loading: false }));
};
