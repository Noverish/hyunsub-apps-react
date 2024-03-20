import { useEffect, useRef } from 'react';
import Swiper from 'swiper';

import ComicViewerHooks from './ComicViewerHooks';
import CommonViewerPage from 'src/pages/common/viewer/CommonViewerPage';
import { setDocumentTitle } from 'src/utils/services';

export default function ComicViewerPage() {
  const swiperRef = useRef<Swiper>();
  const { title, episodeTitle, hasNextEpisode, images, history } = ComicViewerHooks.usePageData();
  ComicViewerHooks.usePageInit(swiperRef.current);
  setDocumentTitle(title + ' - ' + episodeTitle);

  const onIndexChange = ComicViewerHooks.useOnIndexChange();
  const headerBtns = ComicViewerHooks.useHeaderButtons(hasNextEpisode);

  useEffect(() => {
    swiperRef.current?.slideTo(0, 0);
  }, [images]);

  const convertSlide = ComicViewerHooks.useConvertSlide();

  return (
    <CommonViewerPage
      slides={images}
      convertSlide={convertSlide}
      headerBtns={headerBtns}
      initialIndex={history}
      titlePrefix={episodeTitle}
      onIndexChange={onIndexChange}
      swiperRef={swiperRef}
    />
  );
}
