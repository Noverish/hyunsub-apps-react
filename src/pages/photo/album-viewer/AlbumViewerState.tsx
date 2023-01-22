import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PageDataList } from 'src/components/common/swiper/PageSwiperWrapper';
import { PageData } from 'src/model/api';
import { Photo } from 'src/model/photo';

interface State {
  pageDataList: PageDataList<Photo>;
};

const initialState: State = {
  pageDataList: [],
};

const slice = createSlice({
  name: 'albumViewer',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
    putPageData: (state: State, { payload }: PayloadAction<PageData<Photo>>) => {
      state.pageDataList[payload.page] = payload;
    }
  }
});

export default slice;

export const AlbumViewerActions = slice.actions;
