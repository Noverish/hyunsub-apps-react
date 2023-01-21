import { useParams } from 'react-router-dom';
import comicEpisodeDetailApi from 'src/api/comic/comic-episode-detail';
import ImageSwiper from "src/components/common/swiper/ImageSwiper";

export default function ComicViewerPage() {
  const params = useParams<'comicId' | 'order'>();
  const comicId = params.comicId!;
  const order = parseInt(params.order!);

  const comicEpisodeDetail = comicEpisodeDetailApi.useApi({ comicId, order });

  return (
    <div className="ComicViewerPage">
      <ImageSwiper images={comicEpisodeDetail.images} />
    </div>
  )
}
