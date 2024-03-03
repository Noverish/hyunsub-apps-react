import { t } from 'i18next';

import { Album } from 'src/model/photo';

import './AlbumInfoView.scss';

interface Props {
  album: Album;
  total: number;
}

export default function AlbumInfoView(props: Props) {
  const { album, total } = props;

  const memberNames = album.members.map((v, i) => {
    const comma = i ? ', ' : '';

    return (
      <span key={v.userId}>
        {comma}
        {v.name}
      </span>
    );
  });

  return (
    <div className="AlbumInfoView">
      <div className="photo_num">{t('AlbumInfoView.photo-num', [total ?? 0])}</div>
      <div className="middot" />
      <div>
        {t('AlbumInfoView.members')}
        &nbsp; ({memberNames})
      </div>
    </div>
  );
}
