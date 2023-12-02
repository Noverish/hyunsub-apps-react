import { useUrlParams } from 'src/hooks/url-params';
import { ApparelImage } from 'src/model/apparel';
import { CommonViewerData } from 'src/pages/common/viewer/components/CommonViewerSlide';

export interface ApparelViewerPageParams {
  apparelId: string;
  imageId?: string;
}

function usePageParams(): ApparelViewerPageParams {
  const [apparelId] = useUrlParams('apparelId');
  const [imageId] = useUrlParams('imageId');
  return { apparelId, imageId };
}

function convertData(images: ApparelImage[]): CommonViewerData[] {
  return images.map((v) => ({
    type: 'photo',
    url: v.url,
  }));
}

const ApparelViewerHooks = {
  usePageParams,
  convertData,
};

export default ApparelViewerHooks;
