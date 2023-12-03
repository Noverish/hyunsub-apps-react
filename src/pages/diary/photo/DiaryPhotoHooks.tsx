import { useUrlParams } from 'src/hooks/url-params';

export interface DiaryPhotoPageParams {
  date: string;
  photoId: string;
}

function usePageParams(): DiaryPhotoPageParams {
  const [date, photoId] = useUrlParams('date', 'photoId');
  return { date, photoId };
}

const DiaryPhotoHooks = {
  usePageParams,
};

export default DiaryPhotoHooks;
