import { t } from 'i18next';
import { useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import videoEntryDetailApi from 'src/api/video/video-entry-detail';
import videoEntryListApi from 'src/api/video/video-entry-list';
import { VideoCategoryContext } from 'src/context/video/VideoCategoryContext';
import { VideoCategory, VideoSort } from 'src/model/video';
import router from 'src/pages/router';
import VideoRoutes from 'src/pages/video/VideoRoutes';
import { VideoListContext } from 'src/pages/video/list/VideoListState';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

export function useVideoSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = VideoSort.parse(searchParams.get('sort'));

  const getSortName = (v: VideoSort) => t(v.t);

  return {
    sort,
    setSort: async (sort: VideoSort) => {
      searchParams.set('sort', sort.name);
      setSearchParams(searchParams);
    },
    getSortName,
  };
}

export function useVideoCategory(): VideoCategory {
  const categoryName = useParams().category || '';
  const categories = useContext(VideoCategoryContext);
  return categories.filter((v) => v.name === categoryName)[0];
}

export function useLoadVideoListPage() {
  const [state] = useContext(VideoListContext);
  const seed = state.seed;
  const { sort } = useVideoSort();
  const category = useParams().category || '';
  return videoEntryListApi.useInfiniteApi({ category, sort: sort.value, seed });
}

export function useNavigateVideoDetail() {
  return async (entryId: string) => {
    const cache = videoEntryDetailApi.cache({ entryId });
    if (!cache) {
      dispatch(GlobalActions.update({ loading: true }));
      await videoEntryDetailApi.fetch({ entryId });
      dispatch(GlobalActions.update({ loading: false }));
    }
    router.navigate(VideoRoutes.detail({ entryId }));
  };
}
