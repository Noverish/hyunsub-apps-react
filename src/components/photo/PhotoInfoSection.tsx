import { t } from 'i18next';
import { Button } from 'react-bootstrap';

import photoDetailApi from 'src/api/photo/photo-detail';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';
import router from 'src/pages/router';
import { useBreakpointMobile } from 'src/utils/breakpoint';

import './PhotoInfoSection.scss';

interface Props {
  photoId: string;
  albumId?: string;
}

export default function PhotoInfoSection({ albumId, photoId }: Props) {
  const isMobile = useBreakpointMobile();
  const photo = photoDetailApi.useApiResult({ albumId, photoId }).data;

  const onOriginalClick = () => {
    if (isMobile) {
      router.navigate(PhotoRoutes.photoOriginal({ albumId, photoId }));
    } else {
      window.open(photo?.original, '_blank')?.focus();
    }
  };

  return (
    <div className="PhotoInfoSection">
      <div>{t('PhotoInfoSection.file-name')}</div>
      <div>{photo?.fileName}</div>
      <div>{t('PhotoInfoSection.image-size')}</div>
      <div>{photo?.imageSize}</div>
      <div>{t('PhotoInfoSection.file-size')}</div>
      <div>{photo?.fileSize}</div>
      <div>{t('PhotoInfoSection.date')}</div>
      <div>{photo?.date}</div>
      <div>{t('PhotoInfoSection.reg-dt')}</div>
      <div>{photo?.regDt}</div>
      <div>{t('PhotoInfoSection.date-type')}</div>
      <div>{photo?.dateType}</div>
      <Button size="sm" onClick={onOriginalClick} disabled={!photo}>
        {t('PhotoViewer.view-original')}
      </Button>
    </div>
  );
}
