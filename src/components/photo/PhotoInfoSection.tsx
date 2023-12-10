import { t } from 'i18next';
import { Button } from 'react-bootstrap';

import photoDetailApi from 'src/api/photo/photo-detail';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';
import router from 'src/pages/router';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { toLocaleString } from 'src/utils/date';

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

  const onDetailClick = () => {
    router.navigate(PhotoRoutes.photoDetail({ photoId }));
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
      <div>{toLocaleString(photo?.date)}</div>
      <div>{t('PhotoInfoSection.reg-dt')}</div>
      <div>{toLocaleString(photo?.regDt)}</div>
      <div>{t('PhotoInfoSection.date-type')}</div>
      <div>{photo?.dateType}</div>
      <div className="btn_group">
        <Button size="sm" onClick={onOriginalClick} disabled={!photo}>
          {t('PhotoInfoSection.go-to-original')}
        </Button>
        <Button size="sm" onClick={onDetailClick} disabled={!photo}>
          {t('PhotoInfoSection.go-to-detail')}
        </Button>
      </div>
    </div>
  );
}
