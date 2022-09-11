import { useInfiniteQuery } from '@tanstack/react-query';
import flatten from 'lodash/flatten';
import groupBy from 'lodash/groupBy';
import { Container, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import albumDetailApi from 'src/api/photo/album-detail';
import albumPhotosApi from 'src/api/photo/album-photos';
import PhotoHeader from 'src/components/photo/PhotoHeader';
import PhotoThumbnail from 'src/components/photo/PhotoThumbnail';
import { Photo } from 'src/model/photo';
import { useScrollBottom } from 'src/utils';

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
  const albumId = parseInt(useParams().albumId!!, 10);

  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    albumPhotosApi.key({ albumId, page: 0 }),
    ({ pageParam }) => albumPhotosApi.fetch({ albumId, page: pageParam ?? 0 }),
    {
      getNextPageParam: (lastPage, pages) => (lastPage.total === lastPage.end + 1) ? undefined : pages.length,
      suspense: false,
      staleTime: Infinity,
    }
  );

  const album = albumDetailApi.useApi({ albumId });

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  }, [isFetching, fetchNextPage]);

  const photos = flatten(data?.pages.map(v => v.data) ?? []);
  const photoMap = groupBy(photos, v => v.date.substring(0, 10));
  const groups = Object.entries(photoMap).map(([date, photos]) => (
    <PhotoGroupPerDay key={date} date={date} photos={photos} />
  ));

  return (
    <div id="AlbumDetailPage">
      <PhotoHeader />
      <Container id="content">
        <h1>{album.preview.name}</h1>
        <h2>{album.total} Photos</h2>
        <div className="d-grid gap-3">
          {groups}
        </div>
        {isFetching && <div className="flex_center" style={{ height: '8rem' }}>
          <Spinner animation="border"></Spinner>
        </div>}
      </Container>
    </div>
  )
}
