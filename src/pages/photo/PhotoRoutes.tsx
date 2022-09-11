const PhotoRoutes = {
  albumList: () => '/albums',
  albumDetail: (albumId?: number) => (
    (albumId)
      ? `/albums/${albumId}`
      : '/albums/:albumId'
  ),
  albumViewer: (albumId?: number, photoId?: number) => (
    (albumId && photoId)
      ? `/albums/${albumId}/viewer?photoId=${photoId}`
      : '/albums/:albumId/viewer'
  ),
  photoList: () => '/photos',
  photoOriginal: (photoId?: number) => (
    photoId
      ? `/photos/${photoId}`
      : '/photos/:photoId'
  ),
  setting: () => '/setting',
}

export default PhotoRoutes;
