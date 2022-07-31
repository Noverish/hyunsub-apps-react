import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import getCategories from "src/api/video/category";
import getVideoEntries from "src/api/video/video-entry";
import VideoEntryList from "src/components/video/VideoEntryList";
import VideoHeader from "src/components/video/VideoHeader";
import VideoSortDropdown from "src/components/video/VideoSortDropdown";
import { VideoCategory, VideoSort } from "src/model/video";
import NotFoundPage from "src/pages/NotFoundPage";

export function VideoListPage({ category }: { category: VideoCategory }) {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as VideoSort | undefined;

  useEffect(() => {
    document.title = `HyunFlix - ${category.displayName}`;
  }, [category.displayName]);

  const entries = useQuery(`list|${sort}`, () => getVideoEntries({ category: category.name, page: 0, sort })).data!!;

  return (
    <div id="VideoHomePage">
      <VideoHeader />
      <Container id="content">
        <VideoSortDropdown sort={sort} />
        <VideoEntryList entries={entries} />
      </Container>
    </div>
  )
}

export default function VideoListPageWrapper() {
  const categoryStr = useParams().category || '';

  const categories = useQuery('categories', () => getCategories()).data!!;

  const category = categories.filter(v => v.name === categoryStr)[0];
  if (!category) {
    return <NotFoundPage />;
  }

  return <VideoListPage category={category} />
}
