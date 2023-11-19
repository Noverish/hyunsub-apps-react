import { useNavigate } from 'react-router-dom';

import { ComicEpisodePreview } from 'src/model/comic';
import ComicRoutes from 'src/pages/comic/ComicRoutes';

import './ComicEpisodePreviewItem.scss';

interface Props {
  comicId: string;
  episode: ComicEpisodePreview;
}

export default function ComicEpisodePreviewItem({ comicId, episode }: Props) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(ComicRoutes.viewerRoute({ comicId, order: episode.order }));
  };

  const percent = episode.history ? (100 * (episode.history + 1)) / episode.length : 0;

  return (
    <div className="ComicEpisodePreviewItem hyunsub_border gray_bg_hover" onClick={onClick}>
      <div className="history" style={{ width: `${percent}%` }}></div>
      <span>{episode.title}</span>
    </div>
  );
}
