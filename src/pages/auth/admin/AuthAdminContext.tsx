import { Dispatch } from "@reduxjs/toolkit";
import delUserAuthority, { DelUserAuthorityParams } from "src/api/auth/admin/del-user-authority";
import putUserAuthority, { PutUserAuthorityParams } from "src/api/auth/admin/put-user-authority";
import { RootState } from "src/redux";
import { GlobalActions } from "src/redux/global";
import QueryClient from 'src/api/query-client';
import { AdminUser } from "src/model/auth";
import getAllUsers from "src/api/auth/admin/all-users";
import adminSignOut from "src/api/auth/admin/admin-sign-out";

export const putUserAuthorityAction = (params: PutUserAuthorityParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(GlobalActions.update({ loading: true }));
  await putUserAuthority(params);
  QueryClient.setQueryData<AdminUser[]>(getAllUsers.key(), (users) => {
    if (!users) {
      return [];
    }

    users.forEach(user => {
      if (user.idNo === params.idNo) {
        user.authorities.push(params.authorityId);
      }
    });

    return users;
  })
  dispatch(GlobalActions.update({ loading: false }));
}

export const delUserAuthorityAction = (params: DelUserAuthorityParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(GlobalActions.update({ loading: true }));
  await delUserAuthority(params)
  QueryClient.setQueryData<AdminUser[]>(getAllUsers.key(), (users) => {
    if (!users) {
      return [];
    }

    users.forEach(user => {
      if (user.idNo === params.idNo) {
        const i = user.authorities.indexOf(params.authorityId);
        user.authorities.splice(i, 1);
      }
    });

    return users;
  })
  dispatch(GlobalActions.update({ loading: false }));
}

export const adminSignOutAction = (idNo: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(GlobalActions.update({ loading: true }));
  await adminSignOut({ idNo });
  QueryClient.setQueryData<AdminUser[]>(getAllUsers.key(), (users) => {
    if (!users) {
      return [];
    }
    return users.filter(v => v.idNo !== idNo);
  });
  dispatch(GlobalActions.update({ loading: false }));
}
