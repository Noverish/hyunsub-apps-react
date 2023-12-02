import { useUrlParams } from 'src/hooks/url-params';

export interface ApparelBrandDetailPageParams {
  brand: string;
}

function usePageParams(): ApparelBrandDetailPageParams {
  const [brand] = useUrlParams('brand');
  return { brand };
}

const ApparelBrandDetailHooks = {
  usePageParams,
};

export default ApparelBrandDetailHooks;
