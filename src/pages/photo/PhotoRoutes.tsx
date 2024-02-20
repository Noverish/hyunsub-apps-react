import queryString from 'query-string';

import { AlbumDatePageParams } from './album-date/AlbumDateHooks';
import { AlbumViewerPageParams } from './album-viewer/AlbumViewerHooks';
import { PhotoOriginalPageParams } from './photo-original/PhotoOriginalHooks';
import { PhotoViewerPageParams } from './photo-viewer/PhotoViewerHooks';
import { PhotoDetailPageParams } from 'src/pages/photo/photo-detail/PhotoDetailHooks';

const { stringifyUrl } = queryString;

const PhotoRoutes = {
  albums: '/albums',

  albumDetailRoute: '/albums/:albumId',
  albumDetail: (albumId: string) => `/albums/${albumId}`,

  albumViewerRoute: '/albums/:albumId/viewer',
  albumViewer: ({ albumId, ...query }: AlbumViewerPageParams) =>
    stringifyUrl({ url: `/albums/${albumId}/viewer`, query }),

  albumUploadRoute: '/albums/:albumId/upload',
  albumUpload: (albumId: string) => `/albums/${albumId}/upload`,

  albumDateRoute: '/albums/:albumId/date',
  albumDate: ({ albumId }: AlbumDatePageParams) => `/albums/${albumId}/date`,

  photos: '/photos',

  photoViewerRoute: '/photos/viewer',
  photoViewer: ({ ...query }: PhotoViewerPageParams) => stringifyUrl({ url: `/photos/viewer`, query }),

  photoDetailRoute: '/photos/:photoId',
  photoDetail: ({ photoId, ...query }: PhotoDetailPageParams) => stringifyUrl({ url: `/photos/${photoId}`, query }),

  photoOriginalRoute: '/photos/:photoId/viewer',
  photoOriginal: ({ photoId, ...query }: PhotoOriginalPageParams) =>
    stringifyUrl({ url: `/photos/${photoId}/viewer`, query }),

  photoUpload: '/upload',
};

export default PhotoRoutes;
