import flatten from 'lodash/flatten';
import groupBy from 'lodash/groupBy';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import albumDetailApi from 'src/api/photo/album-detail';
import albumPhotosApi from 'src/api/photo/album-photos';
import CommonContainer from 'src/components/common/header/CommonContainer';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import PhotoHeader from 'src/components/photo/PhotoHeader';
import PhotoThumbnail from 'src/components/photo/PhotoThumbnail';
import { Photo } from 'src/model/photo';
import routes from 'src/pages/photo/PhotoRoutes';
import { useScrollBottom } from 'src/utils';
import { setDocumentTitle } from 'src/utils/services';

interface Props {
  date: string;
  photos: Photo[];
}

function PhotoGroupPerDay({ date, photos }: Props) {
  const albumId = parseInt(useParams().albumId!!, 10);

  const photoItems = photos.map(v => (
    <PhotoThumbnail key={v.id} albumId={albumId} photo={v} />
  ))

  return (
    <div>
      <h3>{date}</h3>
      <div className="row g-1 row-cols-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6">
        {photoItems}
      </div>
    </div>
  )
}

export default function AlbumDetailPage() {
  const { t } = useTranslation();
  const albumId = parseInt(useParams().albumId!!, 10);

  const album = albumDetailApi.useApi({ albumId });
  const { data, fetchNextPage, isFetching } = albumPhotosApi.useInfiniteApi({ albumId });

  useEffect(() => {
    setDocumentTitle(t('photo.page.album-detail.title', [album.name]));
  }, [t, album.name]);

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const photos = flatten(data?.pages.map(v => v.data) ?? []);
  const photoMap = groupBy(photos, v => v.date.substring(0, 10));
  const groups = Object.entries(photoMap).map(([date, photos]) => (
    <PhotoGroupPerDay key={date} date={date} photos={photos} />
  ));

  return (
    <div id="AlbumDetailPage">
      <PhotoHeader title={album.name} back />
      <CommonContainer>
        <Link to={routes.albumUpload(albumId)} style={{ float: 'right' }}>
          <Button>{t('photo.page.album-detail.upload')}</Button>
        </Link>
        <h1>{album.name}</h1>
        <hr />
        <h2>{t('photo.page.album-detail.photo-num', [album.photos])}</h2>
        <div className="d-grid gap-3">
          {groups}
        </div>
        <ListLoadingIndicator isFetching={isFetching} />
      </CommonContainer>
    </div>
  )
}
