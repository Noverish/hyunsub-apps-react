import { useContext } from 'react';

import CommonViewerHooks from './CommonViewerHooks';
import { CommonViewerProps, CommonViewerPropsContext, CommonViewerPropsProvider } from './CommonViewerPropsContext';
import { CommonViewerStateContext, CommonViewerStateProvider } from './CommonViewerStateContext';
import CommonViewerInfoContainer from './components/CommonViewerInfoContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import CommonViewerSwiper from 'src/pages/common/viewer/components/CommonViewerSwiper';

import './CommonViewerPage.scss';

function CommonViewerPageInner() {
  const { slides, total, headerBtns, titlePrefix, infoSection } = useContext(CommonViewerPropsContext);
  const [{ index, showHeader }] = useContext(CommonViewerStateContext);
  const headerInfoBtn = CommonViewerHooks.useHeaderInfoBtn();

  const indexStatus = `${index + 1}/${total ?? slides.length}`;
  const title = (titlePrefix ? `${titlePrefix} - ` : '') + indexStatus;
  const btns = infoSection ? headerInfoBtn : headerBtns;

  return (
    <div className="CommonViewerPage">
      {showHeader && <MobileHeader title={title} back btns={btns} />}
      <div className="swiper_container">
        <CommonViewerSwiper />
      </div>
      {infoSection && <CommonViewerInfoContainer>{infoSection}</CommonViewerInfoContainer>}
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
