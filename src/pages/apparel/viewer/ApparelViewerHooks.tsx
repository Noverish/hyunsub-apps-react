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

function convertSlide(image: ApparelImage): CommonViewerData {
  return {
    type: 'photo',
    url: image.url,
  };
}

const ApparelViewerHooks = {
  usePageParams,
  convertSlide,
};

export default ApparelViewerHooks;
