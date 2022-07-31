import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import getVideoEntries from "src/api/video/video-entry";
import VideoEntryList from "src/components/video/VideoEntryList";
import VideoHeader from "src/components/video/VideoHeader";
import VideoSortDropdown from "src/components/video/VideoSortDropdown";
import { VideoSort } from "src/model/video";

export default function VideoListPage() {
  const category = useParams().category || '';
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as VideoSort | undefined;

  const entries = useQuery(`list|${sort}`, () => getVideoEntries({ category, page: 0, sort })).data!!;

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
