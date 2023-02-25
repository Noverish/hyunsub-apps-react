import { useQueries } from '@tanstack/react-query';
import { t } from 'i18next';
import { useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import getCategories from 'src/api/video/category';
import getVideoDetail from 'src/api/video/video-entry-detail';
import { VideoCategory, VideoSort } from 'src/model/video';
import router from 'src/pages/router';
import { VideoListContext } from 'src/pages/video/list/VideoListState';
import VideoRoutes from 'src/pages/video/VideoRoutes';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import videoList from 'src/api/video/video-list';

const parseVideoSort = (sort: string | null): VideoSort => {
  for (const [k, v] of Object.entries(VideoSort)) {
    if (k == sort) {
      return v;
    }
  }
  return VideoSort.random;
}

const getVideoSortName = (sort: VideoSort) => {
  switch (sort) {
    case VideoSort.random: return 'video.term.sort.random';
    case VideoSort.new: return 'video.term.sort.new';
    case VideoSort.old: return 'video.term.sort.old';
    case VideoSort.abc: return 'video.term.sort.abc';
    case VideoSort.zyx: return 'video.term.sort.zyx';
  }
}

export function useVideoSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = parseVideoSort(searchParams.get('sort'));

  const getSortName = (v: VideoSort) => t(getVideoSortName(v));

  return {
    sort,
    setSort: async (sort: VideoSort) => {
      searchParams.set('sort', sort);
      setSearchParams(searchParams);
    },
    getSortName,
  }
}

export function useVideoCategory(): VideoCategory {
  const categoryName = useParams().category || '';
  const categories = getCategories.useApi({});
  return categories.filter(v => v.name === categoryName)[0];
}

export function useLoadVideoListPage() {
  const [state] = useContext(VideoListContext);
  const seed = state.seed;
  const { sort } = useVideoSort();
  const category = useParams().category || '';
  return videoList.useInfiniteApi({ category, sort, seed });
}


export function useNavigateVideoDetail() {
  return async (entryId: string) => {
    const cache = getVideoDetail.cache({ entryId });
    if (!cache) {
      dispatch(GlobalActions.update({ loading: true }));
      await getVideoDetail.fetch({ entryId });
      dispatch(GlobalActions.update({ loading: false }));
    }
    router.navigate(VideoRoutes.detailRoute(entryId, undefined));
  };
}
