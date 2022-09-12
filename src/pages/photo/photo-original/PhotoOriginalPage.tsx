import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import photoDetailApi from 'src/api/photo/photo-detail';
import { urlToName } from 'src/utils';

export default function PhotoOriginalPage() {
  const { t } = useTranslation();

  const photoId = parseInt(useParams().photoId!!, 10);
  const photo = photoDetailApi.useApi({ photoId });

  useEffect(() => {
    const name = urlToName(photo.url);
    document.title = t('photo.page.photo-original.title', [name]);
  }, [t, photo.url]);

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
