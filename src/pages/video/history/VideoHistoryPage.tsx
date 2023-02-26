import { t } from 'i18next';
import flatMap from 'lodash/flatMap';
import videoHistoryListApi from 'src/api/video/video-history-list';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import LoadingSuspense from 'src/components/common/LoadingSuspense';
import VideoHistoryItem from './components/VideoHistoryItem';
import { useScrollBottom } from 'src/utils';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';

function VideoHistoryList() {
  const { data, fetchNextPage, isFetchingNextPage } = videoHistoryListApi.useInfiniteApi({});

  useScrollBottom(() => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const list = flatMap(data!!.pages.map(v => v.data));

  const elements = list.map(v => (
    <VideoHistoryItem key={v.videoId} history={v} />
  ))

  return (
    <>
      <div className="VideoHistoryList">
        {elements}
      </div>
      <ListLoadingIndicator isFetching={isFetchingNextPage} />
    </>
  )
}

export default function VideoHistoryPage() {
  return (
    <div className="VideoHistoryPage">
      <MobileHeader title={t('VideoTabBar.history')} />
      <CommonContainer>
        <LoadingSuspense>
          <VideoHistoryList />
        </LoadingSuspense>
      </CommonContainer>
    </div>
  )
}
