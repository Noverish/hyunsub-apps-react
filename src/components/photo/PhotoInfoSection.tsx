import cs from 'classnames';
import { t } from 'i18next';
import photoDetailApi from 'src/api/photo/photo-detail';

import './PhotoInfoSection.scss';

interface Props {
  show: boolean;
  hide: () => void;
  photoId?: string;
}

export default function PhotoInfoSection({ show, hide, photoId }: Props) {
  return (
    <div className={cs('PhotoInfoSection', { show })}>
      <div className="close_btn flex_center" onClick={hide}>
        <i className="fas fa-times" />
      </div>
      {photoId && <PhotoInfoSectionDetail photoId={photoId} />}
    </div>
  )
}

function PhotoInfoSectionDetail({ photoId }: { photoId: string }) {
  const { data } = photoDetailApi.useApiResult({ photoId });

  return (
    <table>
      <tbody>
        <tr>
          <th>{t('PhotoInfoSection.file-name')}</th>
          <td>{data?.fileName}</td>
        </tr>
        <tr>
          <th>{t('PhotoInfoSection.image-size')}</th>
          <td>{data?.imageSize}</td>
        </tr>
        <tr>
          <th>{t('PhotoInfoSection.file-size')}</th>
          <td>{data?.fileSize}</td>
        </tr>
        <tr>
          <th>{t('PhotoInfoSection.date')}</th>
          <td>{data?.date}</td>
        </tr>
        <tr>
          <th>{t('PhotoInfoSection.reg-dt')}</th>
          <td>{data?.regDt}</td>
        </tr>
        <tr>
          <th>{t('PhotoInfoSection.date-type')}</th>
          <td>{data?.dateType}</td>
        </tr>
      </tbody>
    </table>
  )
}
