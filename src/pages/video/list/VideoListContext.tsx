import { Dispatch } from "@reduxjs/toolkit";
import getVideoEntries from "src/api/video/video-entry";
import { VideoSort } from "src/model/video";
import { RootState } from "src/redux";
import AppConstant from "src/utils/constants";
import { VideoListActions } from "./VideoListState";

export const loadFirstEntries = (category: string, sort?: VideoSort) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { loading, seed } = getState().video.list;
  if (loading) {
    return;
  }
  dispatch(VideoListActions.update({ loading: true, entries: [] }));

  const entries = await getVideoEntries({
    category,
    page: 0,
    sort,
    seed: (sort === VideoSort.random || !sort) ? seed : undefined,
  });

  dispatch(VideoListActions.update({
    loading: false,
    entries,
    page: 0,
  }));
}

export const loadNextEntries = (category: string, sort?: VideoSort) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { page, loading, seed, entries, noMorePage } = getState().video.list;
  if (loading || noMorePage) {
    return;
  }
  dispatch(VideoListActions.update({ loading: true }));

  const nextPage = page + 1;
  const nextEntries = await getVideoEntries({
    category,
    sort,
    page: nextPage,
    seed: (sort === VideoSort.random || !sort) ? seed : undefined,
  });

  dispatch(VideoListActions.update({
    loading: false,
    entries: [...entries, ...nextEntries],
    page: nextPage,
    noMorePage: nextEntries.length < AppConstant.video.ENTRY_PAGE_SIZE
  }));
}
