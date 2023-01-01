import { Base64 } from 'js-base64';
import { useParams } from 'react-router-dom';
import comicEpisodeDetailApi from "src/api/comic/comic-episode-detail";
import ImageSwiper from "src/components/common/swiper/ImageSwiper";

export default function ComicViewerPage() {
  const params = useParams<'name' | 'episode'>();
  const name = Base64.decode(params.name!);
  const episode = Base64.decode(params.episode!);

  const info = comicEpisodeDetailApi.useApi({ name, episode });

  const urls = info.images.map(v => `https://file.hyunsub.kim/Comics/${name}/${episode}/${v}`);

  return (
    <div className="ComicViewerPage">
      <ImageSwiper images={urls} />
    </div>
  )
}
