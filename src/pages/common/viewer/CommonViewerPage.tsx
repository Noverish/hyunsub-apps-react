import { useContext } from 'react';

import CommonViewerHooks, { swiper } from './CommonViewerHooks';
import { CommonViewerProps, CommonViewerPropsContext, CommonViewerPropsProvider } from './CommonViewerPropsContext';
import { CommonViewerStateContext, CommonViewerStateProvider } from './CommonViewerStateContext';
import CommonViewerInfoContainer from './components/CommonViewerInfoContainer';
import PageSelectModal from 'src/components/common/PageSelectModal';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { CommonViewerPropsWithGeneric } from 'src/pages/common/viewer/CommonViewerPropsContext';
import CommonViewerSwiper from 'src/pages/common/viewer/components/CommonViewerSwiper';

import './CommonViewerPage.scss';

function CommonViewerPageInner<T>(genericProps: CommonViewerPropsWithGeneric<T>) {
  const props = useContext(CommonViewerPropsContext);

  const { slides, renderInfoSection } = genericProps;
  const { headerBtns, titlePrefix } = props;

  const [{ index, showHeader, showModal }, setState] = useContext(CommonViewerStateContext);
  const headerInfoBtn = CommonViewerHooks.useHeaderInfoBtn();

  const total = props.total ?? slides?.length ?? 0;
  const indexStatus = `${index + 1}/${total}`;
  const title = (titlePrefix ? `${titlePrefix} - ` : '') + indexStatus;
  const btns = renderInfoSection ? headerInfoBtn : headerBtns;

  const onTitleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setState({ showModal: true });
  };

  const onPageChange = (page: number) => {
    swiper?.slideTo(page, 400);
  };

  const pageSelectModal = (
    <PageSelectModal
      show={showModal}
      onHide={() => setState({ showModal: false })}
      page={index}
      total={total}
      onPageChange={onPageChange}
    />
  );

  const infoSection = renderInfoSection?.(slides[index]);

  return (
    <div className="CommonViewerPage">
      {showHeader && <MobileHeader title={title} back btns={btns} onTitleClick={onTitleClick} transparent show />}
      <div className="swiper_container">
        <CommonViewerSwiper {...genericProps} />
      </div>
      {infoSection && <CommonViewerInfoContainer>{infoSection}</CommonViewerInfoContainer>}
      {total > 0 ? pageSelectModal : undefined}
    </div>
  );
}

export default function CommonViewerPage<T>(props: CommonViewerProps<T>) {
  return (
    <CommonViewerPropsProvider value={props}>
      <CommonViewerStateProvider initialState={{ index: props.initialIndex ?? 0 }}>
        <CommonViewerPageInner {...props} />
      </CommonViewerStateProvider>
    </CommonViewerPropsProvider>
  );
}
