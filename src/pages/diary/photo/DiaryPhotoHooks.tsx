import { useUrlParams } from 'src/hooks/url-params';

export interface DiaryPhotoPageParams {
  date: string;
}

function usePageParams(): DiaryPhotoPageParams {
  const [date] = useUrlParams('date');
  return { date };
}

const DiaryPhotoHooks = {
  usePageParams,
};

export default DiaryPhotoHooks;
