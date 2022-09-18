import { useSelector } from 'src/redux';
import PhotoUploadCell from './PhotoUploadCell';

export default function PhotoUploadList() {
  const { statusList } = useSelector(s => s.photo.albumUpload);

  const items = statusList.map((v, i) =>
    <PhotoUploadCell key={i} status={v} />
  )

  return (
    <div className="row g-1 row-cols-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6">
      {items}
    </div>
  )
}
