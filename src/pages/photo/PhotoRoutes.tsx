import queryString from 'query-string';

import { AlbumViewerPageParams } from './album-viewer/AlbumViewerHooks';
import { PhotoOriginalPageParams } from './photo-original/PhotoOriginalHooks';
import { PhotoViewerPageParams } from './photo-viewer/PhotoViewerHooks';

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
  albumDate: (albumId: string) => `/albums/${albumId}/date`,

  photos: '/photos',

  photoViewerRoute: '/photos/viewer',
  photoViewer: ({ ...query }: PhotoViewerPageParams) => stringifyUrl({ url: `/photos/viewer`, query }),

  photoOriginalRoute: '/photos/:photoId',
  photoOriginal: ({ photoId, ...query }: PhotoOriginalPageParams) => stringifyUrl({ url: `/photos/${photoId}`, query }),

  photoUpload: '/upload',
};

export default PhotoRoutes;
