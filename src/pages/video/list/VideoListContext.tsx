import { Dispatch } from "@reduxjs/toolkit";
import {fetchVideoEntries} from "src/api/video/video-entry";
import { getVideoDetailCache, prefetchVideoDetail } from "src/api/video/video-entry-detail";
import { VideoSort } from "src/model/video";
import { RootState } from "src/redux";
import { GlobalActions } from "src/redux/global";
import AppConstant from "src/utils/constants";
import VideoRoutes from "../VideoRoutes";
import { VideoListActions } from "./VideoListState";
import videoHistory from '../VideoHistory';

export const loadFirstEntries = (category: string, sort?: VideoSort) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { loading, seed } = getState().video.list;
  if (loading) {
    return;
  }
  dispatch(VideoListActions.update({ loading: true, entries: [] }));

  const entries = await fetchVideoEntries({
    category,
    page: 0,
    sort,
    seed: (sort === VideoSort.random || !sort) ? seed : undefined,
  });

  dispatch(VideoListActions.update({
    loading: false,
    entries,
    page: 0,
    noMorePage: false,
  }));
}

export const loadNextEntries = (category: string, sort?: VideoSort) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { page, loading, seed, entries, noMorePage } = getState().video.list;
  if (loading || noMorePage) {
    return;
  }
  dispatch(VideoListActions.update({ loading: true }));

  const nextPage = page + 1;
  const nextEntries = await fetchVideoEntries({
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

export const loadVideoDetail = (entryId: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  const cache = getVideoDetailCache({ entryId });
  if (!cache) {
    dispatch(GlobalActions.update({ loading: true }));
    await prefetchVideoDetail({ entryId });
    dispatch(GlobalActions.update({ loading: false }));
  }
  videoHistory.push(VideoRoutes.getDetailRoute(entryId, undefined));
};
