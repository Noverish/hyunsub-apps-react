import { useNavigate } from "react-router-dom";
import { ComicPreview } from "src/model/comic"
import ComicRoutes from "src/pages/comic/ComicRoutes";

import './ComicPreviewView.scss';

interface Props {
  comic: ComicPreview;
}

export default function ComicPreviewView({ comic }: Props) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(ComicRoutes.detailRoute(comic.id))
  }

  return (
    <div className="ComicPreviewView" onClick={onClick}>
      {comic.title}
    </div>
  )
}
