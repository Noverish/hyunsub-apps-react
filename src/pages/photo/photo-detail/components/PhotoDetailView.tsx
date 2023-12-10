import { t } from 'i18next';

import PhotoDetailHooks from '../PhotoDetailHooks';
import { Photo } from 'src/model/photo';
import { toLocaleString } from 'src/utils/date';

import './PhotoDetailView.scss';

interface Props {
  photo: Photo;
}

export default function PhotoDetailView({ photo }: Props) {
  const showDateModal = PhotoDetailHooks.useShowDateModal(true);

  return (
    <div className="PhotoDetailView">
      <div className="file_name">{photo.fileName}</div>
      <img className="img-fluid" src={photo.original} alt={photo.fileName} />
      <div className="info">
        <div className="info_item">
          <div>{t('PhotoInfoSection.image-size')}</div>
          <div>{photo.imageSize}</div>
        </div>
        <div className="info_item">
          <div>{t('PhotoInfoSection.file-size')}</div>
          <div>{photo.fileSize}</div>
        </div>
        <div className="info_item">
          <div>{t('PhotoInfoSection.reg-dt')}</div>
          <div>{toLocaleString(photo.regDt)}</div>
        </div>
        <div className="info_item cursor_pointer" onClick={showDateModal}>
          <div>
            <span>{t('PhotoInfoSection.date')}</span> <i className="fas fa-pen" />
          </div>
          <div>{toLocaleString(photo.date)}</div>
        </div>
      </div>
    </div>
  );
}
