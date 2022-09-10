const PhotoRoutes = {
  albumList: () => '/album',
  albumDetail: (albumId?: number) => `/album/${albumId ?? ':albumId'}`,
  albumViewer: (albumId?: number, photoId?: number) => (
    (albumId && photoId)
      ? `/album/${albumId}/viewer?photoId=${photoId}`
      : '/album/:albumId/viewer'
  ),
  photoList: () => '/photo',
  setting: () => '/setting',
}

export default PhotoRoutes;
