const PhotoRoutes = {
  albums: '/albums',

  albumDetailRoute: '/albums/:albumId',
  albumDetail: (albumId: number) => `/albums/${albumId}`,

  albumViewerRoute: '/albums/:albumId/viewer',
  albumViewer: (albumId: number, photoId: number) => `/albums/${albumId}/viewer?photoId=${photoId}`,

  albumUploadRoute: '/albums/:albumId/upload',
  albumUpload: (albumId: number) => `/albums/${albumId}/upload`,

  albumDateRoute: '/albums/:albumId/date',
  albumDate: (albumId: number) => `/albums/${albumId}/date`,

  photos: '/photos',

  photoOriginalRoute: '/photos/:photoId',
  photoOriginal: (photoId: number) => `/photos/${photoId}`,

  upload: '/upload',
  share: '/share',
  menu: '/menu',
}

export default PhotoRoutes;
