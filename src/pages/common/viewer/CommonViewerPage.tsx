import { useContext } from 'react';

import CommonViewerHooks, { swiper } from './CommonViewerHooks';
import { CommonViewerProps, CommonViewerPropsContext, CommonViewerPropsProvider } from './CommonViewerPropsContext';
import { CommonViewerStateContext, CommonViewerStateProvider } from './CommonViewerStateContext';
import CommonViewerInfoContainer from './components/CommonViewerInfoContainer';
import PageSelectModal from 'src/components/common/PageSelectModal';
import MobileHeader from 'src/components/common/header/MobileHeader';
import CommonViewerSwiper from 'src/pages/common/viewer/components/CommonViewerSwiper';

import './CommonViewerPage.scss';

function CommonViewerPageInner() {
  const props = useContext(CommonViewerPropsContext);
  const { slides, headerBtns, titlePrefix, infoSection } = props;
  const [{ index, showHeader, showModal }, setState] = useContext(CommonViewerStateContext);
  const headerInfoBtn = CommonViewerHooks.useHeaderInfoBtn();

  const total = props.total ?? slides?.length ?? 0;
  const indexStatus = `${index + 1}/${total}`;
  const title = (titlePrefix ? `${titlePrefix} - ` : '') + indexStatus;
  const btns = infoSection ? headerInfoBtn : headerBtns;

  const onTitleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setState({ showModal: true });
  };

  const onPageChnage = (page: number) => {
    swiper?.slideTo(page, 400);
  };

  const pageSelectModal = (
    <PageSelectModal
      show={showModal}
      onHide={() => setState({ showModal: false })}
      page={index}
      total={total}
      onPageChange={onPageChnage}
    />
  );

  return (
    <div className="CommonViewerPage">
      {showHeader && <MobileHeader title={title} back btns={btns} onTitleClick={onTitleClick} transparent show />}
      <div className="swiper_container">
        <CommonViewerSwiper />
      </div>
      {infoSection && <CommonViewerInfoContainer>{infoSection}</CommonViewerInfoContainer>}
      {total > 0 ? pageSelectModal : undefined}
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
