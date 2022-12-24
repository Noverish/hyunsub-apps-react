import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import albumListApi from "src/api/photo/album-list";
import CommonContainer from 'src/components/common/header/CommonContainer';
import PhotoHeader from 'src/components/photo/PhotoHeader';
import routes from 'src/pages/photo/PhotoRoutes';

export default function AlbumListPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('photo.page.album-list.title');
  }, [t]);

  const albums = albumListApi.useApi({});

  const albumItems = albums.map(v => (
    <Link key={v.id} to={routes.albumDetail(v.id)} className="move_up_on_hover d-block">
      <div className="ratio ratio-1x1">
        <img className="img-fluid rounded-1" src={v.thumbnail} alt={v.name} />
      </div>
      <div className="mt-2">{v.name}</div>
    </Link>
  ))

  return (
    <div id="AlbumListPage">
      <PhotoHeader title="Albums" />
      <CommonContainer>
        <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6">
          {albumItems}
        </div>
      </CommonContainer>
    </div>
  )
}
