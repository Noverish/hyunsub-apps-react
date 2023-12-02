import { useUrlParams } from 'src/hooks/url-params';

export interface ApparelCategoryDetailPageParams {
  category: string;
}

function usePageParams(): ApparelCategoryDetailPageParams {
  const [category] = useUrlParams('category');
  return { category };
}

const ApparelCategoryDetailHooks = {
  usePageParams,
};

export default ApparelCategoryDetailHooks;
