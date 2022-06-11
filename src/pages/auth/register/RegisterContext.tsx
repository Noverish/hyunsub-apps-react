import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import registerApi, { RegisterParams } from 'src/api/auth/register';
import { ErrorResponse } from "src/model/api";
import { RootState } from 'src/redux';
import RegisterPageState from './RegisterState';

export const register = (navigate: NavigateFunction, params: RegisterParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    await registerApi(params);
    alert('회원가입에 성공했습니다. 방금 가입한 정보로 로그인해주세요');
    navigate('/login');
  } catch (ex) {
    const errMsg = (ex as AxiosError<ErrorResponse>).response?.data.msg;
    dispatch(RegisterPageState.actions.update({ errMsg }));
  }
}

export const dummy = () => async (dispatch: Dispatch, getState: () => RootState) => {

};
