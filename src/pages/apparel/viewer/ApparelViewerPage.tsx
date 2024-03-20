import { useMemo } from 'react';

import ApparelViewerHooks from './ApparelViewerHooks';
import apparelDetailApi from 'src/api/apparel/apparel-detail';
import CommonViewerPage from 'src/pages/common/viewer/CommonViewerPage';

export default function ApparelViewerPage() {
  const { apparelId, imageId } = ApparelViewerHooks.usePageParams();
  const { data } = apparelDetailApi.useApiResult({ apparelId });

  const images = useMemo(() => data?.images ?? [], [data]);

  const initialIndex = images.findIndex((v) => v.imageId === imageId);

  return (
    <CommonViewerPage slides={images} convertSlide={ApparelViewerHooks.convertSlide} initialIndex={initialIndex} />
  );
}
