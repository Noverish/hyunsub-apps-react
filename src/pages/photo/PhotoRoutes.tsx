const PhotoRoutes = {
  albums: '/albums',

  albums2: '/albums2',

  albumDetailRoute2: '/albums2/:albumId',
  albumDetail2: (albumId: string) => `/albums2/${albumId}`,

  albumDetailRoute: '/albums/:albumId',
  albumDetail: (albumId: string) => `/albums/${albumId}`,

  albumViewerRoute: '/albums/:albumId/viewer',
  albumViewer: (albumId: number, photoId: number) => `/albums/${albumId}/viewer?photoId=${photoId}`,

  albumViewerRoute2: '/albums2/:albumId/viewer',
  albumViewer2: (albumId: string, photoId: string) => `/albums2/${albumId}/viewer?photoId=${photoId}`,

  albumUploadRoute: '/albums/:albumId/upload',
  albumUpload: (albumId: number) => `/albums/${albumId}/upload`,

  albumUploadRoute2: '/albums2/:albumId/upload',
  albumUpload2: (albumId: string) => `/albums2/${albumId}/upload`,

  albumDateRoute: '/albums/:albumId/date',
  albumDate: (albumId: number) => `/albums/${albumId}/date`,

  albumDateRoute2: '/albums2/:albumId/date',
  albumDate2: (albumId: string) => `/albums2/${albumId}/date`,

  photos: '/photos',

  photoViewerRoute: '/photos/viewer',
  photoViewer: (photoId: string) => `/photos/viewer?photoId=${photoId}`,

  photoOriginalRoute: '/photos/:photoId',
  photoOriginal: (photoId: number) => `/photos/${photoId}`,

  upload: '/upload',
  menu: '/menu',
}

export default PhotoRoutes;
