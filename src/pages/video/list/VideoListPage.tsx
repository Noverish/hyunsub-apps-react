import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import getCategories from "src/api/video/category";
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import VideoEntryList from "src/components/video/VideoEntryList";
import VideoHeader from "src/components/video/VideoHeader";
import VideoSortDropdown from "src/components/video/VideoSortDropdown";
import { VideoCategory, VideoSort } from "src/model/video";
import NotFoundPage from "src/pages/common/NotFoundPage";
import { useDispatch, useSelector } from "src/redux";
import { useScrollBottom } from "src/utils";
import { loadFirstEntries, loadNextEntries } from "./VideoListContext";

export function VideoListPage({ category }: { category: VideoCategory }) {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as VideoSort | undefined;

  const dispatch = useDispatch();
  const { loading, entries } = useSelector(s => s.video.list);

  useEffect(() => {
    dispatch(loadFirstEntries(category.name, sort));
  }, [dispatch, category.name, sort]);

  useEffect(() => {
    document.title = `HyunFlix - ${category.displayName}`;
  }, [category.displayName]);

  useScrollBottom(() => {
    dispatch(loadNextEntries(category.name, sort));
  }, [dispatch, category.name, sort]);

  return (
    <div id="VideoHomePage">
      <VideoHeader />
      <Container id="content">
        <VideoSortDropdown sort={sort} />
        <VideoEntryList category={category} entries={entries} />
        <ListLoadingIndicator isFetching={loading} />
      </Container>
    </div>
  )
}

export default function VideoListPageWrapper() {
  const categories = getCategories.useApi();
  const categoryName = useParams().category || '';

  const category = categories.filter(v => v.name === categoryName)[0];
  if (!category) {
    return <NotFoundPage />;
  }

  return <VideoListPage category={category} />
}
