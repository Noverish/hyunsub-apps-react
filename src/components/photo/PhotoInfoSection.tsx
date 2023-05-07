import cs from 'classnames';
import { t } from 'i18next';

import albumPhotoDetailApi from 'src/api/photo/album-photo-detail';
import photoDetailApi from 'src/api/photo/photo-detail';
import { Photo } from 'src/model/photo';

import './PhotoInfoSection.scss';

interface Props {
  show: boolean;
  hide: () => void;
  albumId?: string;
  photoId?: string;
}

export default function PhotoInfoSection({ show, hide, albumId, photoId }: Props) {
  const table = !photoId ? <PhotoInfoSectionTable /> : albumId ? <PhotoInfoSectionTableForAlbum albumId={albumId} photoId={photoId} /> : <PhotoInfoSectionTableForPhoto photoId={photoId} />;

  return (
    <div className={cs('PhotoInfoSection', { show })}>
      <div className="close_btn flex_center" onClick={hide}>
        <i className="fas fa-times" />
      </div>
      {table}
    </div>
  );
}

function PhotoInfoSectionTableForPhoto({ photoId }: { photoId: string }) {
  const photo = photoDetailApi.useApiResult({ photoId }).data;

  return <PhotoInfoSectionTable photo={photo} />;
}

function PhotoInfoSectionTableForAlbum({ albumId, photoId }: { albumId: string; photoId: string }) {
  const photo = albumPhotoDetailApi.useApiResult({ albumId, photoId }).data;

  return <PhotoInfoSectionTable photo={photo} />;
}

function PhotoInfoSectionTable({ photo }: { photo?: Photo }) {
  return (
    <table>
      <tbody>
        <tr>
          <th>{t('PhotoInfoSection.file-name')}</th>
          <td>{photo?.fileName}</td>
        </tr>
        <tr>
          <th>{t('PhotoInfoSection.image-size')}</th>
          <td>{photo?.imageSize}</td>
        </tr>
        <tr>
          <th>{t('PhotoInfoSection.file-size')}</th>
          <td>{photo?.fileSize}</td>
        </tr>
        <tr>
          <th>{t('PhotoInfoSection.date')}</th>
          <td>{photo?.date}</td>
        </tr>
        <tr>
          <th>{t('PhotoInfoSection.reg-dt')}</th>
          <td>{photo?.regDt}</td>
        </tr>
        <tr>
          <th>{t('PhotoInfoSection.date-type')}</th>
          <td>{photo?.dateType}</td>
        </tr>
      </tbody>
    </table>
  );
}
