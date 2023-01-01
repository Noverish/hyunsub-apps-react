import { useNavigate } from "react-router-dom";
import { ComicEpisodePreview } from "src/model/comic"
import ComicRoutes from "src/pages/comic/ComicRoutes";

import './ComicEpisodeView.scss';

interface Props {
  name: string;
  episode: ComicEpisodePreview;
}

export default function ComicEpisodeView({ name, episode }: Props) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(ComicRoutes.viewerRoute(name, episode.title));
  }

  return (
    <div className="ComicEpisodeView" onClick={onClick}>
      {episode.title}
    </div>
  )
}
