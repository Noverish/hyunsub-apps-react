import { useNavigate } from "react-router-dom";
import { ComicEpisodePreview } from "src/model/comic";
import ComicRoutes from "src/pages/comic/ComicRoutes";

import './ComicEpisodeView.scss';

interface Props {
  comicId: string;
  episode: ComicEpisodePreview;
}

export default function ComicEpisodeView({ comicId, episode }: Props) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(ComicRoutes.viewerRoute(comicId, episode.order));
  }

  return (
    <div className="ComicEpisodeView" onClick={onClick}>
      {episode.title}
    </div>
  )
}
