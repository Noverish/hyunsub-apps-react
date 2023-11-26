import { useContext } from 'react';

import { CommonViewerProps, CommonViewerPropsContext, CommonViewerPropsProvider } from './CommonViewerPropsContext';
import { CommonViewerStateContext, CommonViewerStateProvider } from './CommonViewerStateContext';
import MobileHeader from 'src/components/common/header/MobileHeader';
import CommonViewerSwiper from 'src/pages/common/viewer/components/CommonViewerSwiper';

import './CommonViewerPage.scss';

function CommonViewerPageInner() {
  const { slides, total, headerBtns, titlePrefix } = useContext(CommonViewerPropsContext);
  const [{ index, showHeader }] = useContext(CommonViewerStateContext);

  const indexStatus = `${index + 1}/${total ?? slides.length}`;
  const title = (titlePrefix ? `${titlePrefix} - ` : '') + indexStatus;

  return (
    <div className="CommonViewerPage">
      {showHeader && <MobileHeader title={title} back btns={headerBtns} />}
      <CommonViewerSwiper />
    </div>
  );
}

export default function CommonViewerPage(props: CommonViewerProps) {
  return (
    <CommonViewerPropsProvider value={props}>
      <CommonViewerStateProvider initialState={{ index: props.initialIndex ?? 0 }}>
        <CommonViewerPageInner />
      </CommonViewerStateProvider>
    </CommonViewerPropsProvider>
  );
}
