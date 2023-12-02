import { useMemo } from 'react';

import ApparelViewerHooks from './ApparelViewerHooks';
import apparelDetailApi from 'src/api/apparel/apparel-detail';
import CommonViewerPage from 'src/pages/common/viewer/CommonViewerPage';
import { CommonViewerData } from 'src/pages/common/viewer/components/CommonViewerSlide';

export default function ApparelViewerPage() {
  const { apparelId, imageId } = ApparelViewerHooks.usePageParams();
  const { data } = apparelDetailApi.useApiResult({ apparelId });

  const images = useMemo(() => data?.images ?? [], [data]);
  const slides: CommonViewerData[] = useMemo(() => ApparelViewerHooks.convertData(images), [images]);

  const initialIndex = images.findIndex((v) => v.imageId === imageId);

  return <CommonViewerPage slides={slides} initialIndex={initialIndex} />;
}
