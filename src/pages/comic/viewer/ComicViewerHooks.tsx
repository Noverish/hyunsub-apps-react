import { useEffect, useMemo, useRef } from 'react';
import Swiper from 'swiper';

import ComicRoutes from '../ComicRoutes';
import comicEpisodeDetailApi from 'src/api/comic/comic-episode-detail';
import comicHistorySetApi from 'src/api/comic/comic-history-set';
import { useUrlParams } from 'src/hooks/url-params';
import { ComicEpisodeDetail } from 'src/model/comic';
import { HeaderButton } from 'src/model/component';
import { CommonViewerData } from 'src/pages/common/viewer/components/CommonViewerSlide';
import router from 'src/pages/router';

export interface ComicViewerPageParams {
  comicId: string;
  order: number;
}

function usePageParams(): ComicViewerPageParams {
  const [comicId, order] = useUrlParams('comicId', 'order');

  return {
    comicId,
    order: parseInt(order),
  };
}

function usePageData(): ComicEpisodeDetail {
  const { comicId, order } = usePageParams();

  const { data } = comicEpisodeDetailApi.useApiResult({ comicId, order });
  if (data) {
    return data;
  }

  return {
    comicId: '',
    order: 0,
    title: '',
    episodeTitle: '',
    length: 0,
    regDt: '',
    images: [],
    history: undefined,
    hasNextEpisode: false,
  };
}

function usePageInit(swiper: Swiper | undefined) {
  const { history } = usePageData();
  const inited = useRef(false);

  useEffect(() => {
    if (!inited.current && history && swiper) {
      setTimeout(() => {
        swiper.slideTo(history, 0);
      }, 0);
      inited.current = true;
    }
  }, [swiper, history]);
}

function useOnIndexChange() {
  const { comicId, order } = usePageParams();

  return (index: number) => {
    comicHistorySetApi({ comicId, order, page: index });
  };
}

function useHeaderButtons(hasNextEpisode: boolean): HeaderButton[] {
  const { comicId, order } = usePageParams();
  const { images } = usePageData();

  const move = (diff: number) => () =>
    router.navigate(ComicRoutes.viewerRoute({ comicId, order: order + diff }), { replace: true });

  const list: HeaderButton[] = [];

  if (images.length === 0) {
    return list;
  }

  if (order > 0) {
    list.push({
      icon: 'fas fa-step-backward',
      name: 'Prev Episode',
      onClick: move(-1),
    });
  }

  if (hasNextEpisode) {
    list.push({
      icon: 'fas fa-step-forward',
      name: 'Next Episode',
      onClick: move(1),
    });
  }

  return list;
}

function useSlides(): CommonViewerData[] {
  const { images, title, episodeTitle } = usePageData();

  return useMemo(
    () =>
      images.map((v) => ({
        type: 'photo',
        url: `https://file.hyunsub.kim/Comics/${title}/${episodeTitle}/${v}`,
      })),
    [images, title, episodeTitle],
  );
}

const ComicViewerHooks = {
  usePageParams,
  usePageData,
  usePageInit,
  useHeaderButtons,
  useOnIndexChange,
  useSlides,
};

export default ComicViewerHooks;
