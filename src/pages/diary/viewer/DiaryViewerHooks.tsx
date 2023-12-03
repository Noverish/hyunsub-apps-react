import { useUrlParams } from 'src/hooks/url-params';

export interface DiaryViewerPageParams {
  date: string;
  photoId: string;
}

function usePageParams(): DiaryViewerPageParams {
  const [date, photoId] = useUrlParams('date', 'photoId');
  return { date, photoId };
}

const DiaryViewerHooks = {
  usePageParams,
};

export default DiaryViewerHooks;
