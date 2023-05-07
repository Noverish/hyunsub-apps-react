import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ToastInfo {
  millis: number;
  content: string;
  show: boolean;
}

interface State {
  list: ToastInfo[];
}

const initialState: State = {
  list: [],
};

const slice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    insert: (state: State, { payload }: PayloadAction<string>) => {
      const millis = new Date().getTime();
      state.list.push({
        millis,
        content: payload,
        show: true,
      });
    },
    delete: (state: State, { payload }: PayloadAction<number>) => {
      state.list.forEach((v) => {
        if (v.millis === payload) {
          v.show = false;
        }
      });
    },
    flush: (state: State) => {
      return {
        ...state,
        list: state.list.filter((v) => v.show),
      };
    },
  },
});

export default slice.reducer;

export const insertToast = slice.actions.insert;
export const deleteToast = slice.actions.delete;
export const flushToast = slice.actions.flush;
