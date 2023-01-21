import { useParams } from 'react-router-dom';
import comicDetailApi from 'src/api/comic/comic-detail';
import comicEpisodeDetailApi from 'src/api/comic/comic-episode-detail';
import comicHistorySetApi from 'src/api/comic/comic-history-set';
import ImageSwiper from "src/components/common/swiper/ImageSwiper";
import { ComicDetail, ComicEpisodeDetail } from 'src/model/comic';
import { useEffect } from 'react';

export default function ComicViewerPage() {
  const params = useParams<'comicId' | 'order'>();
  const comicId = params.comicId!;
  const order = parseInt(params.order!);

  const comicEpisodeDetail = comicEpisodeDetailApi.useApi({ comicId, order });

  useEffect(() => {
    window.document.title = comicEpisodeDetail.title;
  }, [comicEpisodeDetail.title]);

  const onPageChange = (page: number) => {
    comicHistorySetApi({ comicId, order, page });
    comicDetailApi.updateCache({ comicId }, (cache: ComicDetail) => {
      cache.episodes.filter(v => v.order === order)[0].history = page
    });
    comicEpisodeDetailApi.updateCache({ comicId, order }, (cache: ComicEpisodeDetail) => {
      cache.history = page;
    })
  }

  return (
    <div className="ComicViewerPage">
      <ImageSwiper images={comicEpisodeDetail.images} onPageChange={onPageChange} initialPage={comicEpisodeDetail.history} />
    </div>
  )
}
