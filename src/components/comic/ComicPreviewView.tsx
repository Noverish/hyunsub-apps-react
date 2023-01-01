import { useNavigate } from "react-router-dom";
import { ComicPreview } from "src/model/comic"
import ComicRoutes from "src/pages/comic/ComicRoutes";

import './ComicPreviewView.scss';

interface Props {
  preview: ComicPreview;
}

export default function ComicPreviewView({ preview }: Props) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(ComicRoutes.detailRoute(preview.name))
  }

  return (
    <div className="ComicPreviewView" onClick={onClick}>
      {preview.name}
    </div>
  )
}
