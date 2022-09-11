import { useParams } from 'react-router-dom';
import photoDetailApi from 'src/api/photo/photo-detail';

export default function PhotoOriginalPage() {
  const photoId = parseInt(useParams().photoId!!, 10);
  const photo = photoDetailApi.useApi({ photoId });

  return (
    <div className="flex_center vh-100 vw-100">
      <img
        className="mw-100 mh-100"
        src={photo.url}
        alt={photo.id.toString()}
      />
    </div>
  )
}
