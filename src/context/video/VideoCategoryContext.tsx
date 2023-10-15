import { createContext } from 'react';

import videoCategoryApi from 'src/api/video/video-category';
import { VideoCategory } from 'src/model/video';

interface Props {
  children: React.ReactNode;
}

export const VideoCategoryContext = createContext<VideoCategory[]>([]);

export const VideoCategoryProvider = ({ children }: Props) => {
  const { data } = videoCategoryApi.useApiResult({});

  const value = data ?? [];

  return <VideoCategoryContext.Provider value={value}>{children}</VideoCategoryContext.Provider>;
};
