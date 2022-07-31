import { Container } from "react-bootstrap";
import VideoEntryList from "src/components/video/VideoEntryList";
import VideoHeader from "src/components/video/VideoHeader";
import VideoSortDropdown from "src/components/video/VideoSortDropdown";
import { useQuery } from 'react-query';
import getVideoEntries from "src/api/video/video-entry";

function VideoEntryListWrapper() {
  const { data } = useQuery('entries', () => getVideoEntries({ category: 'movie', page: 0 }), {
    refetchOnWindowFocus: false,
    retry: 0,
  });

  if (!data) {
    return <div />;
  }

  return <VideoEntryList entries={data} />;
}

export default function VideoHomePage() {
  return (
    <div id="VideoHomePage">
      <VideoHeader />
      <Container id="content">
        <VideoSortDropdown />
        <VideoEntryListWrapper />
      </Container>
    </div>
  )
}
