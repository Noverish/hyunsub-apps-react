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
  albumUpload: (albumId?: number) => (
    (albumId)
      ? `/albums/${albumId}/upload`
      : '/albums/:albumId/upload'
  ),
  albumExifDate: (albumId?: number) => (
    (albumId)
      ? `/albums/${albumId}/exif/date`
      : '/albums/:albumId/exif/date'
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
