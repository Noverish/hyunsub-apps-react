import { ProgressBar } from "react-bootstrap";
import { PhotoUploadStatus } from "src/pages/photo/album-upload/AlbumUploadState";

import './PhotoUploadCell.scss';

interface Props {
  status: PhotoUploadStatus;
}

export default function PhotoUploadCell(props: Props) {
  const { status } = props;
  const { progress, photo } = status;

  const progressBar = (progress >= 0)
    ? <ProgressBar striped now={progress} label={`${progress}%`} />
    : <ProgressBar striped now={100} label="ERROR" variant="danger" />

  const content = (photo)
    ? <img className="img-fluid" src={photo.thumbnail} alt={photo.thumbnail} />
    : <div className="progress_container">{progressBar}</div>

  return (
    <div className="PhotoUploadCell">
      <div className="ratio ratio-1x1">
        {content}
      </div>
    </div>
  )
}
