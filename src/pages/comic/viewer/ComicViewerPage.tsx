import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swiper from 'swiper';

import ComicRoutes from '../ComicRoutes';
import comicDetailApi from 'src/api/comic/comic-detail';
import comicEpisodeDetailApi from 'src/api/comic/comic-episode-detail';
import comicHistorySetApi from 'src/api/comic/comic-history-set';
import ImageSwiper from 'src/components/common/swiper/ImageSwiper';
import { ComicDetail, ComicEpisodeDetail } from 'src/model/comic';
import { setDocumentTitle } from 'src/utils/services';

export default function ComicViewerPage() {
  const navigate = useNavigate();
  const params = useParams<'comicId' | 'order'>();
  const comicId = params.comicId!;
  const order = parseInt(params.order!);

  const comicEpisodeDetail = comicEpisodeDetailApi.useApi({ comicId, order });
  const { title, episodeTitle, hasNextEpisode, history } = comicEpisodeDetail;
  const swiperRef = useRef<Swiper>();

  useEffect(() => {
    setDocumentTitle(title + ' - ' + episodeTitle);
  }, [title, episodeTitle]);

  useEffect(() => {
    swiperRef.current?.slideTo(comicEpisodeDetail.history || 0, 0);
  }, [comicEpisodeDetail]);

  const onPageChange = (page: number) => {
    if (hasNextEpisode && page === comicEpisodeDetail.length) {
      return;
    }

    comicHistorySetApi({ comicId, order, page });
    comicDetailApi.updateCache({ comicId }, (cache: ComicDetail) => {
      cache.episodes.filter((v) => v.order === order)[0].history = page;
    });
    comicEpisodeDetailApi.updateCache({ comicId, order }, (cache: ComicEpisodeDetail) => {
      cache.history = page;
    });
  };

  const goToNextEpisode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(ComicRoutes.viewerRoute(comicId, order + 1), { replace: true });
  };

  const urls = comicEpisodeDetail.images.map((v) => `https://file.hyunsub.kim/Comics/${title}/${episodeTitle}/${v}`);

  const additionalLastSlide = hasNextEpisode ? (
    <div className="w-100 h-100 flex_Center">
      <Button onClick={goToNextEpisode}>다음화 보기</Button>
    </div>
  ) : undefined;

  return (
    <div className="ComicViewerPage">
      <ImageSwiper initialSlide={history || 0} slides={urls} onSlideChange={onPageChange} additionalLastSlide={additionalLastSlide} titlePrefix={episodeTitle} onSwiper={(s) => (swiperRef.current = s)} />
    </div>
  );
}
