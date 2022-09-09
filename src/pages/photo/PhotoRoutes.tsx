const PhotoRoutes = {
  albumList: () => '/album',
  albumDetail: (albumId?: number) => `/album/${albumId ?? ':albumId'}`,
  photoList: () => '/photo',
  setting: () => '/setting',
}

export default PhotoRoutes;
