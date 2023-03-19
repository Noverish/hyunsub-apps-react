const PhotoRoutes = {
  albums: '/albums',

  albums2: '/albums2',

  albumDetailRoute: '/albums/:albumId',
  albumDetail: (albumId: string) => `/albums/${albumId}`,

  albumViewerRoute: '/albums/:albumId/viewer',
  albumViewer: (albumId: number, photoId: number) => `/albums/${albumId}/viewer?photoId=${photoId}`,

  albumUploadRoute: '/albums/:albumId/upload',
  albumUpload: (albumId: number) => `/albums/${albumId}/upload`,

  albumDateRoute: '/albums/:albumId/date',
  albumDate: (albumId: number) => `/albums/${albumId}/date`,

  photos: '/photos',

  photoViewerRoute: '/photos/viewer',
  photoViewer: (photoId: string) => `/photos/viewer?photoId=${photoId}`,

  photoOriginalRoute: '/photos/:photoId',
  photoOriginal: (photoId: number) => `/photos/${photoId}`,

  upload: '/upload',
  menu: '/menu',
}

export default PhotoRoutes;
