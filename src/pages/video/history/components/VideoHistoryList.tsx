import videoHistoryListApi from 'src/api/video/video-history-list';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import useScrollBottom from 'src/hooks/scroll-bottom';
import VideoHistoryItem from 'src/pages/video/history/components/VideoHistoryItem';

interface Props {
  category: string;
}

export default function VideoHistoryList({ category }: Props) {
  const { infiniteData, fetchNextPage, isFetchingNextPage } = videoHistoryListApi.useInfiniteApi({ category });

  useScrollBottom(() => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const elements = infiniteData.map((v) => <VideoHistoryItem history={v} key={v.videoId} />);

  return (
    <>
      <div className="VideoHistoryList d-grid row-col-2 row-col-md-4 gap-2 gap-md-3">{elements}</div>
      <ListLoadingIndicator isFetching={isFetchingNextPage} />
    </>
  );
}
