import cs from 'classnames';
import { t } from 'i18next';
import { Button, Container } from 'react-bootstrap';

import photoDetailApi from 'src/api/photo/photo-detail';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';
import router from 'src/pages/router';

import './PhotoInfoSection.scss';

interface Props {
  show: boolean;
  hide: () => void;
  photoId: string;
  albumId?: string;
}

export default function PhotoInfoSection({ show, hide, albumId, photoId }: Props) {
  const photo = photoDetailApi.useApiResult({ albumId, photoId }).data;

  const onOriginalClick = () => {
    router.navigate(PhotoRoutes.photoOriginal({ albumId, photoId }));
  };

  return (
    <div className={cs('PhotoInfoSection', { show })}>
      <div className="close_btn flex_center" onClick={hide}>
        <i className="fas fa-times" />
      </div>
      <Container>
        <div className="info_container">
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
          {photo && (
            <Button size="sm" onClick={onOriginalClick}>
              {t('PhotoViewer.view-original')}
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}
