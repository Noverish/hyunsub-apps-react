const PhotoRoutes = {
  albums: '/albums',

  albumDetailRoute: '/albums/:albumId',
  albumDetail: (albumId: string) => `/albums/${albumId}`,

  albumViewerRoute: '/albums/:albumId/viewer',
  albumViewer: (albumId: string, photoId: string) => `/albums/${albumId}/viewer?photoId=${photoId}`,

  albumUploadRoute: '/albums/:albumId/upload',
  albumUpload: (albumId: string) => `/albums/${albumId}/upload`,

  albumDateRoute: '/albums/:albumId/date',
  albumDate: (albumId: string) => `/albums/${albumId}/date`,

  photos: '/photos',

  photoViewerRoute: '/photos/viewer',
  photoViewer: (photoId: string) => `/photos/viewer?photoId=${photoId}`,

  photoOriginalRoute: '/photos/:photoId',
  photoOriginal: (photoId: number) => `/photos/${photoId}`,

  upload: '/upload',

  menu: '/menu',
}

export default PhotoRoutes;
