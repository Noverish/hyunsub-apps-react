import flatMap from 'lodash/flatMap';
import { useContext } from 'react';

import { VideoListContext, VideoListProvider } from './VideoListState';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import LoadingSuspense from 'src/components/common/LoadingSuspense';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import VideoEntryList from 'src/components/video/VideoEntryList';
import useScrollBottom from 'src/hooks/scroll-bottom';
import NotFoundPage from 'src/pages/common/NotFoundPage';
import { useLoadVideoListPage, useVideoCategory } from 'src/pages/video/list/VideoListHooks';
import VideoSortDropdown from 'src/pages/video/list/components/VideoSortDropdown';
import VideoSortModal from 'src/pages/video/list/components/VideoSortModal';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

function VideoList() {
  const category = useVideoCategory();
  setDocumentTitle(category.displayName);

  const { data, fetchNextPage, isFetchingNextPage } = useLoadVideoListPage();

  useScrollBottom(() => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <>
      <VideoEntryList category={category} entries={flatMap(data!!.pages.map((v) => v.data))} />
      <ListLoadingIndicator isFetching={isFetchingNextPage} />
    </>
  );
}

export function VideoListPage() {
  const setState = useContext(VideoListContext)[1];
  const isMobile = useBreakpointMobile();
  const category = useVideoCategory();

  const headerBtns = [
    {
      icon: 'fas fa-sort-alpha-down',
      onClick: () => setState({ showSortModal: true }),
    },
  ];

  return (
    <div id="VideoHomePage">
      <MobileHeader title={category.displayName} back btns={headerBtns} />
      <CommonContainer>
        {isMobile || <VideoSortDropdown />}
        <LoadingSuspense>
          <VideoList />
        </LoadingSuspense>
      </CommonContainer>
      <VideoSortModal />
    </div>
  );
}

export default function VideoListIndex() {
  if (!useVideoCategory()) {
    return <NotFoundPage />;
  }

  return (
    <VideoListProvider>
      <VideoListPage />
    </VideoListProvider>
  );
}
